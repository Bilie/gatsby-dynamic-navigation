import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import SEO from '../components/seo'

export default ({ data }) => {
  const article = data.markdownRemark

  return (
    <Layout layoutType="sidebar">
      <SEO title={article.frontmatter.title} />
      <section className="content__main content__main--docs">
        <Sidebar />
        <section dangerouslySetInnerHTML={{ __html: article.html }} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`