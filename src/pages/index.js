import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import '../styles/blog-listing.css'


// const IndexPage = () => (
//   <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link> <br />
//     <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
//   </Layout>
// )

// export default IndexPage

export default function Index({data}) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title="UiraCode" />
      <div className="blog-posts">
        { posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({node: post}) => {
              return (
                <div className="blog-post-preview" key={post.id}>
                  <h1>
                    <Link to={post.frontmatter.path}> {post.frontmatter.title} </Link>
                  </h1>
                  <h2> {post.frontmatter.date} </h2>
                  <p> {post.excerpt} </p>
                </div>
              );
            })
        }
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark( 
      sort: {
        order: DESC,
        fields: [frontmatter___date]
      }
    ) {
      edges {
        node {
          excerpt( pruneLength: 250 )
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;


