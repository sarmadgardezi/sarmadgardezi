import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import config from '../utils/config'
import sg from '../../content/thumbnails/sg.png'
import Ssummit from '../../content/thumbnails/7summit.png'
import pkt20 from '../../content/thumbnails/pkt20.png'
import mim from '../../content/thumbnails/mim.png'
import comsatsmzd from '../../content/thumbnails/comsatsmzd.png'
import github from '../assets/nav-github.png'
import qurranonline from '../../content/thumbnails/qurranonline.png'
import thecentrepoint from '../../content/thumbnails/thecentrepoint.png'
import zainforhearts from '../../content/thumbnails/zainforhearts.png'
import zeuz from '../../content/thumbnails/zeuz.png'

const projectsList = [
  {
    name: 'Sarmad Gardezi',
    slug: 'sarmadgardezi',
    tagline: 'A free, open source website of sarmadgardezi.com.',
    image: sg,
    url: 'https://sarmadgardezi.com',
    writeup: '/setup',
    description: `Personal website with articles 📚, projects 🎨, and other information about me.`,
  },
  {
    name: 'comsatsmzd.com',
    image: comsatsmzd,
    slug: 'comsatsmzd',
    tagline: 'A PHP Website with netlify CMS',
    url: 'https://comsatsmzd.com/',
  },
  {
    name: 'mim.limited',
    tagline: 'A WordPress CMS Website',
    image: mim,
    url: 'https://mim.limited/',
  },
  {
    name: '7summit.me',
    slug: '7summit',
    tagline: 'An WordPress website with Custom Dev..',
    image: Ssummit,
    url: 'https://7summit.me/',
    description: `An International Salt Company which sells salt.`,
  },
  {
    name: 'pkt20.com',
    slug: 'pkt20',
    tagline: 'A Custom theme in WordPress CMS',
    image: pkt20,
    url: 'https://pkt20.com',
  },

  {
    name: 'qurranonline.com',
    slug: 'qurranonline',
    tagline: 'A PHP website in Gatsby.',
    url: 'https://www.qurranonline.com',
    image: qurranonline,
  },
  {
    name: 'thecentrepoint.pk',
    slug: 'thecentrepoint',
    tagline: 'A WordPress Site with Custom theme.',
    url: 'https://thecentrepoint.pk',
    image: thecentrepoint,
  },

  {
    name: 'zainforhearts.org',
    slug: 'zainforhearts',
    tagline: 'A Custom PHP website with PHP CMS',
    url: 'https://zainforhearts.org/',
    image: zainforhearts,
  },
  {
    name: 'zeuz.media',
    slug: 'zeuz',
    tagline: 'A Custom CMS Website in PHP',
    url: 'https://www.zeuz.media/',
    image: zeuz,
  },
]

export default function ProjectsIndex() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/sarmadgardezi/repos?per_page=100'
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        setRepos(data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Helmet title={`Projects | ${config.siteTitle}`} />
      <SEO />

      <article>
        <header>
          <div className="container">
            <h1>Projects</h1>
            <p className="description">
              A few highlights of my open-source projects. View them all{' '}
              <a href="https://github.com/sarmadgardezi">on GitHub</a>.
            </p>
          </div>
        </header>

        <section className="projects large container">
          {projectsList.map((project) => (
            <div className="project" key={project.name}>
              <h2>{project.name}</h2>
              {project.image && <img src={project.image} alt={project.name} />}
              <div className="links tags">
                {project.writeup && <Link to={project.writeup}>Write-up</Link>}
                <a
                  href={`https://github.com/sarmadgardezi/${project.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source
                </a>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
              </div>
              <p className="description">{project.tagline}</p>
              <div className="stars">
                {repos.find((repo) => repo.name === project.slug) && (
                  <>
                    <img src={github} alt="sarmadgardezi.com" />
                    <span>
                      <a
                        
                      >
                        {Number(
                          repos.find((repo) => repo.name === project.slug)
                            .stargazers_count
                        ).toLocaleString()}
                      </a>
                      {` stars on GitHub`}
                    </span>
                    <span></span>
                  </>
                )}
              </div>
            </div>
          ))}
        </section>
      </article>
    </>
  )
}

ProjectsIndex.Layout = Layout