/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const slash = require(`slash`)
const { createFilePath, createNodeField } = require(`gatsby-source-filesystem`)
const isIndex = (name) => (name === `index` || name.indexOf('__index') !== -1)

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions
    const fileNode = (node.parent && node.parent !== 'undefined') ?
      getNode(node.parent) :
      node
    const {
      dir = ``,
      name
    } = path.parse(fileNode.relativePath)
    let fileName = ``
    let priority = 1

    if (!isIndex(name)) {
      fileName = name.split('__')
      priority = parseInt(fileName[0], 10)
      fileName = fileName[fileName.length - 1]
    }

    createNodeField({
      node,
      name: `priority`,
      value: priority,
    })

    createNodeField({
      node,
      name: `slug`,
      value: path.posix.join(`/docs`, dir, fileName),
    })

    createNodeField({
      node,
      name: `category`,
      value: fileNode.relativeDirectory,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
              slug
            }
          }
        }
      }
    }
  `
    ).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/docs.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}