import { StaticQuery, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import categories from '../data/categories';

import './sidebar.css'

const getPagesByCategory = function(pages, categories) {
  const pagesByCategory = {}

  pages.group.forEach((pageGroup) => {
    // Grab the category key from the 1st item in the pages list
    // they all have the same category key, so no need to iterate each one
    const categoryKey = pageGroup.edges[0].node.fields.category
    pagesByCategory[categoryKey] = {}
    pagesByCategory[categoryKey].pages = pageGroup.edges
    pagesByCategory[categoryKey].categoryName = categories[categoryKey].name
    pagesByCategory[categoryKey].categoryId = categories[categoryKey].id
  })

  return pagesByCategory;
}

const Sidebar = () => (
  <StaticQuery
    query={graphql`
      query {
        docs: allMarkdownRemark(sort: {fields: fields___priority}) {
          group(field: fields___category) {
            edges {
              node {
                id
                fields {
                  slug
                  priority
                  category
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const pagesByCategory = getPagesByCategory(data.docs, categories)

      return (
        <>
        <nav className="sidebar">
          <ul className="sidebar__category-list">
          {
            Object.keys(pagesByCategory).map(function (categoryKey, i) {
              return (
                <li className="sidebar__category-list__item" key={i}>
                  <span className="sidebar__category">
                    {pagesByCategory[categoryKey].categoryName}
                  </span>
                    
                  <ul className="sidebar-links-list">
                    {pagesByCategory[categoryKey].pages.map(function (p) {
                      return (
                        <li className="sidebar-links-list__item" key={p.node.id}>
                          <Link
                            to={p.node.fields.slug}
                            className="sidebar-links-list__link"
                            activeClassName="sidebar-links-list__link--active">
                            {p.node.frontmatter.title}
                          </Link>
                        </li>
                      )}
                    )}
                  </ul>
                </li>
              )
            })
          }
          </ul>
        </nav>
        </>
      )
      }
    }
  />
)



Sidebar.propTypes = {
  siteTitle: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: ``,
}

export default Sidebar
