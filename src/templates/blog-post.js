import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout"
import '../styles/blog-post-override.css'
// import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

export default function Template({data}) {
    const post = data.markdownRemark;
    const postTitle = "UiraCode | " + post.frontmatter.title
    // deckDeckGoHighlightElement();
    return (
        <Layout>
        <div className="blog-post-container">
            <Helmet title={postTitle} />
            <div className="blog-post">
                <h1>{post.frontmatter.title}</h1>
                <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </div>
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/prism.min.js"></script> */}
        {/* <script src="js/syntax.min.js"></script> */}
        </Layout>
    );
}

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { 
            path: { eq: $path }
            }
        ) {
            html frontmatter {
                date(formatString: "MMMM DD, YYYY") path title
            }
        }
    }
`;

// export default function Template({  data }) {  const post = data.markdownRemark;   return (    <div className="blog-post-container">     <Helmet title={`CodeStack - ${post.frontmatter.title}`} />      <div className="blog-post">        <h1>{post.frontmatter.title}</h1>        <div          className="blog-post-content"          dangerouslySetInnerHTML={{ __html: post.html }}        />      </div>    </div>  );}


// export const pageQuery = graphql`  query BlogPostByPath($path: String!) {    markdownRemark(frontmatter: { path: { eq: $path } }) {      html      frontmatter {        date(formatString: "MMMM DD, YYYY")        path        title      }    }  }`;

