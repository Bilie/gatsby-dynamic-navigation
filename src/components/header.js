import { StaticQuery, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

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

            <ul>
            {
              data.allFile.edges.map((page, i) =>{
                return (
                  <li key={page.node.id}>
                    <Link
                      to={page.node.name}>
                      {page.node.name}
                    </Link>
                  </li> 
                )
              })
            }
            </ul>
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
