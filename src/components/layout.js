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
      <div>
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
