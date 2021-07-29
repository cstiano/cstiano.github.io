import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import { SocialIcon } from "react-social-icons"

const About = () => (
  <Layout>
    <SEO title="UiraCode | About" />
    <div style={{ maxWidth: `180px`, marginBottom: `1.45rem`, marginLeft: `auto`, marginRight: `auto`}}>
      {/* <Image /> */}
      <img src="https://raw.githubusercontent.com/cstiano/cstiano.github.io/source/src/images/profile-image.JPG" style={{marginBottom:`5px`, borderRadius:`50%`}}/>
    </div>
    <div style={{textAlign: `center`}}>
      <h1>Hello! I'm Cris.</h1>
      <div style={{fontFamily: `Andale Mono`}}>
        <p>I work as a software engineer for <a style={{color: "gray"}} href="https://www.incognia.com/">Incognia</a>. B.S Computer Engineer by Universidade Federal de Pernambuco (UFPE), and I'm member of the RobôCIn - Robotics Research Group from UFPE. I'm passionate for build and learn new things; when I'm not working I like to read, drawing, listen to music (always), and spend some time on side projects (and I have a cat).</p>
        <p>UiraCode (Uira = <a style={{color: "gray"}} href="https://en.wikipedia.org/wiki/Musician_wren">Uirapuru</a>) is a space where I document my process of explore new things (my study notes), mostly related to coding/technology but also to other subjects of my interest.</p>
      </div>
      <SocialIcon network="github" url="https://github.com/cstiano" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="linkedin" url="https://www.linkedin.com/in/cristiano-oliveira-3a8947117/" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="twitter" url="https://twitter.com/crisdoliver" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="instagram" url="https://www.instagram.com/cristiano1915" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="medium" url="https://medium.com/@cristianosoliveira42" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="email" url="mailto:cristianosoliveira42@gmail.com" bgColor="black" style={{margin: `5px`}}/>
    </div>
  </Layout>
)

export default About


