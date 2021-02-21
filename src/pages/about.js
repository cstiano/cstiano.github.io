import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import { SocialIcon } from "react-social-icons"

const About = () => (
  <Layout>
    <SEO title="UiraCode" />
    <div style={{ maxWidth: `180px`, marginBottom: `1.45rem`, marginLeft: `auto`, marginRight: `auto`}}>
      <Image />
    </div>
    <div style={{textAlign: `center`}}>
      <h1>Hello! I'm Cris.</h1>
      <p>I work as a software engineer for Incognia. B.S Computer Engineer by Federal University of Pernambuco.</p>
      <SocialIcon network="github" url="https://github.com/cstiano" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="linkedin" url="https://linkedin.com/in/jaketrent" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="twitter" bgColor="black" style={{margin: `5px`}}/>
      <SocialIcon network="instagram" bgColor="black" style={{margin: `5px`}}/>
    </div>
  </Layout>
)

export default About


