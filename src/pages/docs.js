import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Sidebar from '../components/sidebar'

const DocsPage = () => (
  <Layout>
    <SEO title="Docs" />
    <Sidebar />
    <section>
      <h1>Documentation</h1>
    </section>
  </Layout>
)

export const frontmatter = {
  title: 'Page 2',
  path: 'page-2'
}

export default DocsPage
