---
path: "/event-driven-lib-with-coroutines"
date: "2021-07-29T07:55:33.962Z"
title: "Creating an event-driven lib with coroutines"
---

---

This study note explore a little bit of the asynchronous feature provided by Kotlin, a.k.a [coroutines](https://kotlinlang.org/docs/coroutines-overview.html), by using it on the Android platform.

Most Android applications work with many asynchronous components, and build consistent communication between them is a way of keeping the application state in control. The idea here is to use coroutines to create a simple lib that handles event broadcasting between any components in the application: an asynchronous message-passing system based on the Event-Driven Architecture (or EventBus).

This type of architecture is base on the Publisher-Subscriber pattern, having consumers of some event subscribing to receive events and producers publishing events. Each consumer that subscribes to an event will listen to a channel that delivers the event immediately when the producer publishes it.

![Publisher-Subscriber diagram](https://raw.githubusercontent.com/cstiano/cstiano.github.io/source/src/images/pub-sub-diagram.png)

So, first things first, what will be the name of the project? The first thing that pops in my head was "spine", as an analogy to the spinal column, but I looked in github and already exists a [project](https://github.com/spine/spine) with this name. So I just included stream in it and we have the name: SpineStream (SS).

Before starting to thought about the structure of the project I search for existent libs with the same purpose and I found [EventBus](https://github.com/greenrobot/EventBus) (java), [EventHub](https://github.com/deva666/EventHub) (java), and [Broker](https://github.com/adrielcafe/Broker) (kotlin). I liked the strategy that each one of these took and inspires me to compare to what I wanted to SpineStream.

One possible source of problems is subscription management, that situation when you forgot to call the function that unsubscribes the channel during the end of the process. All three libs need to call the unsubscription method.

SpineStream should manage the (un)subscriptions in the background, and those who use just have to call the subscription/publish functions, and the lib makes the necessary control of the channels when the process finishes. So, I wanted to call only one method for each purpose publish/subscribe (plug and play), without managing subscriptions or setting up contexts for the subscription. Here is a spoiler of the final interface:

``` java 
// MainActivity

 override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    SpineStream.subscribe<UserInfo> { event ->
        Log.d(TAG, "Received user: $event")
    }

}
```

``` java
// UserService

override fun onStart(intent: Intent?, startId: Int) {
    super.onStart(intent, startId)
    
    SpineStream.publish(userInfo)
    
}
```

The requisites for this the initial version are: 

- Broadcast events from any component;
- Only have the publish and subscribe interfaces;
- Manage the broadcast channels in the background, to support the workarounds with simple interfaces (no need to deal with channel registration and unsubscription);
- Attach the channel manager to the application lifecycle;
- The events can be any type of data object;

A way of transfer events with coroutines is by using the broadcast channels primitives. Coroutines provide some different types of broadcast channels and I tested them to make sure which one I going to use in SS. For that, I made a playground test suite on my project to see the behavior of each Broadcast Channel.

- **Channel** - have a relation of one to one, meaning that the producer will send the event for one consumer, in the scenario when you have many consumers, the produced event is received by the first consumer and all other ones will not get the event.
- **BroadcastChannel** - different from the Channel, the BroadcastChannel assures that all consumers subscribed in the channel receives the event emitted by the producer (one to many relation).
- **ConflatedBroadcastChannel** - this one is similar to BroacastChannel, enabling many subscribers, but it assures that the consumers will only receives the most recent event emitted.

I ended up choosing the BroadcastChannel that delivers all events published, considering the buffer configured, and all subscribers will receive the events. Having the core tool decided, I sketched the following structure for the project.

![SpineStream diagram](https://raw.githubusercontent.com/cstiano/cstiano.github.io/source/src/images/spine-stream-diag.png)

The SS architecture are composed by *1)* an init module, that going to initialize the channels and attach the lib to the application lifecycle; *2)* A channel manager attached to the application lifecycle responsible for flush the channels when necessary; *3)* The handler that implements the publisher and subscriber interfaces, containing the logic to exchange events through the channels; *4)* The SpineStream model makes public the interfaces as a static class.

In this project, I also wanted to test the initialization using [Content Provider](https://developer.android.com/guide/topics/providers/content-provider-basics). The Android Content Provider is a component that supplies content/data between different applications and can be useful to initialize SDKs. The approach applying content provider eliminates the necessity of calling an init method by the developer who is using the lib. The code below shows the *InitProvider* that was implemented.

``` java
abstract class InitProvider : ContentProvider() {

    override final fun insert(uri: Uri, values: ContentValues?): Uri? = null

    override final fun query(
        uri: Uri,
        projection: Array<out String>?,
        selection: String?,
        selectionArgs: Array<out String>?,
        sortOrder: String?
    ): Cursor? = null

    override final fun getType(uri: Uri): String? = null

    override final fun update(
        uri: Uri,
        values: ContentValues?,
        selection: String?,
        selectionArgs: Array<out String>?
    ): Int = 0

    override final fun delete(
        uri: Uri,
        selection: String?,
        selectionArgs: Array<out String>?
    ): Int = 0
}
```

The init module attaches the *ChannelsManager* to the application lifecycle. The ProcessLifycycleOwner was used to make this attachment, which dispatches specific triggers to an observer module regarding lifecycle steps (e.g: ON_START). If you want a more profound understanding of ProcessLifecycleOwner, take a look at the documentation [here](https://developer.android.com/reference/android/arch/lifecycle/ProcessLifecycleOwner). Foreground cycles are mandatory in this first version, so ProcessLifecycleOwner fits well with the purpose because SpineStream just needs to know when the application enters the OnStop state to refresh the in-used channels.

``` java
class SpineStreamInitProvider : InitProvider() {

    override fun onCreate(): Boolean {
        initSpineStreamSDK()
        return true
    }

    private fun initSpineStreamSDK() {
        if (BuildConfig.DEBUG) {
            Log.d("SpineStreamSDK", "Initializing Spine Stream SDK")
        }
        ProcessLifecycleOwner.get().lifecycle.addObserver(ChannelsManager())
    }
}
```

``` java
class ChannelsManager : LifecycleObserver {

    init {
        SharedChannels.createChannels(ConcurrentHashMap<String, 
                                        BroadcastChannel<Any>>(DEFAULT_CAPACITY))
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    fun onStop() {
        if (BuildConfig.DEBUG) {
            Log.d("SpineStreamSDK", "onStop Channel Spine Stream SDK")
        }

        val channels = SharedChannels.provideChannels()
        for (channel in channels) {
            channel.value.cancel()
            channel.value.close()
        }
        channels.clear()
    }
}
```

The Handler module is the core of SpineStream, which deals directly with the publishing/subscribing operations. To manage different types of data classes, the handler uses a hash map that binds the class name to a specific channel. The coroutines make the events broadcast with BroadcastChannels and uses only background context to make sure that the event exchanges don't interfere on the mainThread.

``` java
open class Handler : Publisher, Subscriber {

    @VisibleForTesting
    val channels by lazy { SharedChannels.provideChannels() }

    override fun publish(event: Any) {
        val className = event::class.toString()
        createChannelIfNecessary(className)
        GlobalScope.launch {
            channels[className]?.send(event)
        }
    }

    override fun <T : Any> subscribe(eventClass: KClass<T>, onEvent: suspend (T) -> Unit) {
        val className = eventClass.toString()
        createChannelIfNecessary(className)
        GlobalScope.launch {
            channels[className]?.openSubscription().let { channel ->
                if (channel != null) {
                    for (event in channel) {
                        onEvent(event as T)
                    }
                }
            }
        }
    }

    private fun createChannelIfNecessary(eventClassName: String) {
        if (channels[eventClassName] == null) {
            channels[eventClassName] = BroadcastChannel(DEFAULT_CAPACITY)
        }
    }
}
```

And that's pretty much it, the purpose here was to implement an event-driven lib as simple as possible to play with coroutines, as an extra I can evolve this project by increasing other features, or integrate it in another project that fits with these requisites. This project has an overhead implementation by including an init module with the content provider, but it's something that I wanted to test. There are others types of event-driven similar implementations for android (or using a publish-subscribe logic, e.g: LiveData), and there is pro and cons of using this logic, but this discussion isn't in the scope here. You can look at the SpineStream source code [here](https://www.github.com/cstiano/spine-stream).

---

#### References

- [Discovering Event-Driven Architecture for Android](https://proandroiddev.com/discovering-event-driven-architecture-for-android-717e6332065e)
- [Creating Content Providers | CodePath Android Cliffnotes](https://guides.codepath.com/android/creating-content-providers)
- [Broadcast Channels - raywenderlich](https://www.raywenderlich.com/books/kotlin-coroutines-by-tutorials/v2.0/chapters/12-broadcast-channels)
- [Background and Foreground events with Android Architecture Components](https://medium.com/@arturogdg/background-and-foreground-events-with-android-architecture-components-233fdd9fa855)

