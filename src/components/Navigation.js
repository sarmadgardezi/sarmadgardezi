import React from 'react'
import { Link } from 'gatsby'

import { Hamburger } from '../assets/Hamburger'
import moon from '../assets/moon.png'
import blog from '../assets/nav-blog.png'
import floppy from '../assets/nav-floppy.png'
import github from '../assets/nav-github.png'
import projects from '../assets/nav-projects.png'
import twitter from '../assets/nav-twitter.png'

const mainNavItems = [
  { url: '/about', icon: floppy, label: 'About me' },
  { url: '/blog', icon: blog, label: 'Articles' },
  { url: '/projects', icon: projects, label: 'Projects' },
]

const socialNavItems = [
  { url: 'https://github.com/sarmadgardezi', icon: github, label: 'GitHub' },
  { url: 'https://twitter.com/sarmadgardezi', icon: twitter, label: 'Twitter' },
]

export const Navigation = ({ onUpdateTheme}) => {
  return (
    <header className="navigation">
      <div className="navigation-inner">
        <nav className="brand-section">
         

          <Link to="/" className="brand">
            <span>Sarmad Gardezi</span>
          </Link>
        </nav>
        <div>
          <nav>
            {mainNavItems.map((item) => (
              <Link to={item.url} key={item.label} activeClassName="active">
                <img src={item.icon} alt={item.label} />
                <div className="tooltip">{item.label}</div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="toolbar-section">
          <nav className="social-nav">
            {socialNavItems.map((item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                key={item.label}
              >
                <img src={item.icon} alt={item.label} />
              </a>
            ))}
          </nav>
          <button onClick={onUpdateTheme} className="theme-switcher">
            <img src={moon} alt="Theme" />
          </button>
        </div>
      </div>
    </header>
  )
}
