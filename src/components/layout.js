/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Media from 'react-media'

import Header from "./header"
import Sidebar from "./sidebar"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./layout.css"
import '../styles/blog-listing.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
      {/* Part that includes the image and default message of the gatsby */}
      {/* <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div> */}

      

      <div>    
          {/* <Helmet      
            title="Gatsby Default Starter" meta={[        
              { name: "description", content: "Sample" },        
              { name: "keywords", content: "sample, something" }      
              ]}    />     */}
          <Header />    
          <div     
            style={{        
              margin: "0 auto",        
              maxWidth: 980,        
              display: "flex",        
              flexDirection: "row",        
              justifyContent: "space-between",       
              height: "100%"      }}    >      
            <Media query={{ maxWidth: 848 }}>        
              {matches => matches ? (            
                <div 
                  style={{                
                    margin: "0 auto",                
                    maxWidth: 980,                
                    display: "flex",                
                    flexDirection: "row",                
                    justifyContent: "space-between",                
                    height: "100%",                
                    padding: "25px"              
                    }}>              
                  <div style={{ flex: 1 }}>{children}</div>            
                </div>) : (            
                <div              
                  style={{                
                    margin: "0 auto",                
                    maxWidth: 980,                
                    display: "flex",                
                    flexDirection: "row",                
                    justifyContent: "space-between",                
                    height: "100%",                
                    padding: "25px"              
                    }} >              
                  <div style={{ flex: 2.5, paddingRight: "30px" }}>                
                    {children}              
                  </div>
                  {/* <div style={{ flex: 1 }}>                 */}
                    {/* <Sidebar                  
                      title="Codestack"                  
                      description="Articles on React and Node.js. All articles are written by Me. Fullstack Web Development."/>                
                    <Sidebar title="About author" description="I am a Full-stack Web Developer specializing in React and Node.js based in Nigeria."                />               */}
                  {/* </div>             */}
                </div> 
                )        
              } 
            </Media>    
          </div>  
        </div>


    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
