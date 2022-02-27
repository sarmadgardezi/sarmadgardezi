import React from 'react'

import gatsby from '../assets/gatsby.png'
import github from '../assets/nav-github.png'

const links = [
  { url: 'https://sarmadgardezi.substack.com/subscribe', label: 'Newsletter' },
  { url: 'https://ko-fi.com/sarmadgardezi', label: 'Ko-Fi' },
  { url: 'https://patreon.com/sarmadgardezi', label: 'Patreon' },
  { url: 'https://www.sarmadgardezi.com/rss.xml', label: 'RSS' },
]
const madeWithLinks = [
  { url: 'https://www.gatsbyjs.org/', label: 'Gatsby', icon: gatsby },
  { url: 'https://github.com/sarmadgardezi', label: 'GitHub', icon: github },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <nav>
          
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <nav>
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <span>{link.label}</span>
              <img src={link.icon} alt={link.label} />
            </a>
          ))}
        </nav>
        <span className="desktop-only">Copyright© 2022 Page protected by Google's Privacy and Terms of Service</span>
      </section>
    </footer>
  )
}
