import * as React from 'react'

function MdiGithub() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
      ></path>
    </svg>
  )
}

function MdiRssBox() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m2.5 12A1.5 1.5 0 0 0 6 16.5A1.5 1.5 0 0 0 7.5 18A1.5 1.5 0 0 0 9 16.5A1.5 1.5 0 0 0 7.5 15M6 10v2a6 6 0 0 1 6 6h2a8 8 0 0 0-8-8m0-4v2a10 10 0 0 1 10 10h2A12 12 0 0 0 6 6Z"
      ></path>
    </svg>
  )
}

function Link({ href, children }) {
  return (
    <a
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

const Footer = () => {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link href="https://github.com/xg4">
        <MdiGithub /> github
      </Link>
      <Link href="/rss.xml">
        <MdiRssBox /> rss
      </Link>
    </footer>
  )
}

export default Footer
