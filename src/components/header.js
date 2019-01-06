import { StaticQuery, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import './header.css'
import normalizePageName from '../utils/normalizePageName';

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {
          sourceInstanceName: {eq: "pages"},
          name: {regex: "/^(?!index|404).*$/"}
        }) {
          edges {
            node {
              id
              name
              relativeDirectory
            }
          }
        },
        allJavascriptFrontmatter {
          edges {
            node {
              id
              frontmatter {
                title
                path
              }
            }
          }
        },
        menuItems: allFile(filter: {
          sourceInstanceName: {eq: "pages"},
          name: {regex: "/^(?!index|404).*$/"}
        }) {
          edges {
            node {
              id
              name
              relativeDirectory
              childJavascriptFrontmatter {
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }`
    }
    render={data => {
      return (
        <div
          style={{
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
          }}
        >
          <div
            className="header__content"
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `1.45rem 1.0875rem`,
            }}
          >
            <h1 style={{ margin: 0 }}>
              <Link
                to="/"
                style={{
                  color: `white`,
                  textDecoration: `none`,
                }}
              >
                {siteTitle}
              </Link>
            </h1>

            {/* Menu items with gatsby-source-filesystem */}
            <ul className="site-menu-list">
            {
              data.allFile.edges.map((page) =>{
                return (
                  <li className="site-menu-list__item" key={page.node.id}>
                    <Link
                      to={page.node.name}
                      className="site-menu-list__link"
                      activeClassName="site-menu-list__link--active">
                      {normalizePageName(page.node.name)}
                    </Link>
                  </li> 
                )
              })
            }
            </ul>
            
            {/* Menu items with gatsby-source-filesystem and frontmatter */}
            {/*
            <ul className="site-menu-list">
            {
              data.allJavascriptFrontmatter.edges.map((page) =>{
                return (
                  <li className="site-menu-list__item" key={page.node.id}>
                    <Link
                      to={page.node.frontmatter.path}
                      className="site-menu-list__link"
                      activeClassName="site-menu-list__link--active">
                      {page.node.frontmatter.title}
                    </Link>
                  </li> 
                )
              })
            }
            </ul>
            */}

            {/* Menu items with frontmatter */}
            {/*
            <ul className="site-menu-list">
            {
              data.menuItems.edges.map((page) =>{
                return (
                  <li className="site-menu-list__item" key={page.node.id}>
                    <Link
                      to={page.node.name}
                      className="site-menu-list__link"
                      activeClassName="site-menu-list__link--active">
                      {page.node.childJavascriptFrontmatter.frontmatter.title}
                    </Link>
                  </li> 
                )
              })
            }
            </ul>
            */}
          </div>
        </div>
      )}
    }
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
