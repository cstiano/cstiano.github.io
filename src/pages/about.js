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
      <Image />
    </div>
    <div style={{textAlign: `center`}}>
      <h1>Hello! I'm Cris.</h1>
      <div style={{fontFamily: `Andale Mono`}}>
        <p>I work as a software engineer for <a style={{color: "gray"}} href="https://www.incognia.com/">Incognia</a>. B.S Computer Engineer by Federal University of Pernambuco. Passionate for build and learn new things. When I'm not working I like to read, drawing, listen to rap music (always), and spend some time on side projects (and I have a cat).</p>
        <p>UiraCode (<a style={{color: "gray"}} href="https://en.wikipedia.org/wiki/Musician_wren">Uirapuru</a> Code) is a space where I document my process of explore new things (study notes), mostly related to coding/technology but also other subjects of my interest.</p>
      </div>
      <SocialIcon network="github" url="https://github.com/cstiano" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="linkedin" url="https://www.linkedin.com/in/cristiano-oliveira-3a8947117/" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="twitter" url="https://twitter.com/crisdoliver" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="instagram" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="email" url="mailto:cristianosoliveira42@gmail.com" bgColor="black" style={{margin: `5px`}}/>
    </div>
  </Layout>
)

export default About


