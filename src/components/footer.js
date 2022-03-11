import * as React from 'react'

const Footer = () => {
  return (
    <footer>
      <div style={{ float: 'right' }}>
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          rss
        </a>
      </div>
      <a
        href="https://github.com/xg4"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
      <div style={{ marginTop: 15 }}>
        © {new Date().getFullYear()} xg4, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </footer>
  )
}

export default Footer
