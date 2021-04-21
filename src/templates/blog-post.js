import { graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout"

export default function Template({data}) {
    const post = data.markdownRemark;
    const postTitle = "UiraCode | " + post.frontmatter.title
    
    return (
        <Layout>
        <div className="blog-post-container">
            <Helmet title={postTitle} />
            <div className="blog-post">
                <h1>{post.frontmatter.title}</h1>
                <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </div>
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