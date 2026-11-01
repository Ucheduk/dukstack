import React from "react";
import { Link, graphql } from "gatsby";
import './single-portfolio.css'

import Layout from "../components/layout";
import SEO from "../components/seo";
import portfolioImage from "../components/portfolioImage";

interface PortfolioProps {
  data: any
}

export const query = graphql`
    query (
      $slug: String!
    ) {
      markdownRemark (
        fields: {
          slug: {
            eq: $slug
          }
        }
      ) {
          frontmatter {
            title
            tags
            link
            image
            gallery
            desc
            content
            technologies
        }
      }
    }
  `

const Portfolio = ({ data }: PortfolioProps) => {
  const { image, gallery } = data.markdownRemark.frontmatter;
  const imageList = [image, ...(gallery ? gallery.split(', ') : [])];
  const technologiesList = data.markdownRemark.frontmatter.technologies.split(', ');

  return (
    <Layout>
      <section className="container single-portfolio-section">
        <div className="single-portfolio-section__content">
          <h1 className="title">{data.markdownRemark.frontmatter.title}</h1>
          <span className="text-content">
              {data.markdownRemark.frontmatter.desc}
          </span>
          {data.markdownRemark.frontmatter.link ?
            <a target="blank" href={data.markdownRemark.frontmatter.link} className="visit-btn"><i className="zmdi zmdi-arrow-right-top arrow"></i>Visit Website</a>
            : null
          }
          {imageList.map((imageName: string, index: number): any => {
            return (
              <div className="single-portfolio-content__boxes" key={imageName || index}>
                <div className="single-portfolio-content__header">{data.markdownRemark.frontmatter.title}</div>
                <img src={portfolioImage(imageName)} alt="" />
              </div>
            )
          })}

          <h2 className="title-h2">About this project</h2>
          <span className="text-content">
            {data.markdownRemark.frontmatter.content}
          </span>

          <h2 className="title-h2">Technologies</h2>
          <span className="text-content">
            <ul>
              {technologiesList.map((technologies: any): any => {
                return (
                  <li key={technologies}>{technologies}</li>
                )
              })}
            </ul>
          </span>
          <Link to='/portfolio' className="visit-btn"><i className="zmdi zmdi-arrow-back arrow"></i>Go Back</Link>
        </div>
      </section>
      
      <div className="bg-circle-1"></div>
      <div className="bg-circle-2"></div>
      <div className="bg-circle-3"></div>
    
    </Layout>
  )
}

export default Portfolio

export const Head = ({ data }: PortfolioProps) => (
  <SEO
    title={`Portfolio - ${data.markdownRemark.frontmatter.title}`}
    description={data.markdownRemark.frontmatter.desc}
  />
)
