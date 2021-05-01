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
        href="https://twitter.com/xingor4_"
        target="_blank"
        rel="noopener noreferrer"
      >
        twitter
      </a>{' '}
      &bull;{' '}
      <a
        href="https://github.com/xg4"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>{' '}
    </footer>
  )
}

export default Footer
