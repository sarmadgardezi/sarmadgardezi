import React, { useState, useEffect, useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { getSimplifiedPosts } from '../utils/helpers'
import github from '../assets/nav-github.png'
import floppy from '../assets/nav-floppy.png'
import looking from '../assets/me.jpeg'
import projects from '../components/data/projects'
import ProjectListing from '../components/ProjectListing'

export default function WebsiteIndex({ data }) {
  const [followers, setFollowers] = useState(null)
  const latest = data.latest.edges
  const highlights = data.highlights.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest, {thumbnails: true } ), [latest])
  const simplifiedHighlights = useMemo(
    () =>
      getSimplifiedPosts(highlights, { shortTitle: true, thumbnails: true }),
    [highlights]
  )

  useEffect(() => {
    async function getGithubAPI() {
      const response = await fetch('https://api.github.com/users/sarmadgardezi')
      const data = await response.json()
      return data
    }

    getGithubAPI().then((data) => {
      setFollowers(data.followers)
    })
  }, [])

  return (
    <>
      <Helmet title='Sarmad Gardezi - a Digital Creator'
       />
      <SEO /> 
      <article className="hero">
        <header>
          <div className="container">
            <div className="flex-content">
              <div>
                <h1>Hey, I'm Sarmad<svg xmlns="http://www.w3.org/2000/svg" width="42" height="32" viewBox="0 0 22 22" fill="none" role="img" aria-labelledby="a3mn4u9tqv3kwktwphzmwxsw1e99kril" class="verification verification--verified ml-2" data-test="verified-profile"><title id="a3mn4u9tqv3kwktwphzmwxsw1e99kril">Verified</title>
<path d="M22 11L19.56 8.21L19.9 4.52L16.29 3.7L14.4 0.5L11 1.96L7.6 0.5L5.71 3.69L2.1 4.5L2.44 8.2L0 11L2.44 13.79L2.1 17.49L5.71 18.31L7.6 21.5L11 20.03L14.4 21.49L16.29 18.3L19.9 17.48L19.56 13.79L22 11ZM8.38 15.01L6 12.61C5.61 12.22 5.61 11.59 6 11.2L6.07 11.13C6.46 10.74 7.1 10.74 7.49 11.13L9.1 12.75L14.25 7.59C14.64 7.2 15.28 7.2 15.67 7.59L15.74 7.66C16.13 8.05 16.13 8.68 15.74 9.07L9.82 15.01C9.41 15.4 8.78 15.4 8.38 15.01Z" fill="#582be8"></path>
</svg></h1> 
                <p className="subtitle small">
                  I'm a software engineer in Islamabad Pakistan. I love building
                  open-source <Link to="/projects">projects</Link> and{' '}
                  <Link to="/blog">writing</Link> about what I learn. This
                  website is my digital garden—a compendium of the things I've
                  learned and created over the years.
                </p>
              </div>
              <img src={looking} alt="Me" className="main-image" />
            </div>
            <p className="hero-buttons">
              <Link to="/me" className="hero-button">
                <img src={floppy} alt="Me" />
                More about me
              </Link>
              {followers && (
                <a
                  href="https://github.com/sarmadgardezi"
                  target="_blank"
                  className="hero-button"
                  rel="noreferrer"
                >
                  <img src={github} alt="GitHub" />
                  <span className="bright">
                    {Number(followers).toLocaleString()}
                  </span>
                  {' followers on GitHub'}
                </a>
              )}
            </p>
          </div>
        </header>
 
        <div className="container">
          <h2 className="main-header">
            <span>Latest Articles</span> <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedLatest} />
 {/* Highlights on front page below
          <h2 className="main-header">
            <span>Highlights</span> <Link to="/blog">View All</Link>
          </h2>
          <Posts data={simplifiedHighlights} yearOnly /> */}

          <h2 className="main-header">
            <span>Open Source Projects</span> <Link to="/projects">View All</Link>
          </h2>
          <ProjectListing projects={projects} />

          <h2 className="main-header">Newsletter</h2>
          <div className="flex-content">
            <p>
              Subscribe to the newsletter to get my latest content by email. Not
              on any set schedule. Unsubscribe anytime.
            </p>
            <p className="hero-buttons">
              <a
                href="https://sarmadgardezi.substack.com/subscribe"
                className="button"
              >
                Subscribe
              </a>
            </p>
          </div>
        </div>
     </article>
    </>
  )
}

WebsiteIndex.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 7
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 99
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            shortTitle
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 25, height: 25) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`