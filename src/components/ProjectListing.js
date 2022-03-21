import React, { Component } from 'react'

export default class ProjectListing extends Component {
  render() {
    const { projects } = this.props

    return (
      <div className="posts">
        {projects.map(project => (
          <a className="post" href={project.source} key={project.title}>
          <span className="flex">
           <h3  key={project.title}>{project.icon} 	&nbsp; {project.title}</h3>
           
            </span>
            <div><time> 
            🚀
            </time></div>
          </a>
        ))}
      </div>
    )
  }
}