import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Sidebar from '../components/sidebar'

const DocsPage = () => (
  <Layout>
    <SEO title="Docs" />
    <Sidebar />
    <section>
      <h1>Introduction</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur sit, architecto, culpa esse placeat quos dignissimos recusandae impedit. Architecto sapiente, laborum cumque animi rem possimus ad quidem illum. Optio, dignissimos!</p>
    </section>
  </Layout>
)

export const frontmatter = {
  title: 'Page 2',
  path: 'page-2'
}

export default DocsPage
