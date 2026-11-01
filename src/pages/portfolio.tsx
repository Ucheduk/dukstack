import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby";
import './portfolio.css'

import Layout from "../components/layout";
import SEO from "../components/seo";
import portfolioImage from "../components/portfolioImage";

const Portfolio = () => {

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { frontmatter: { order: ASC } }) {
        edges {
          node {
            frontmatter {
              title
              tags
              image
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <section className="container portfolio-section">
        <div className="portfolio-section__content">
          <h1 className="title">Portfolio</h1>
          <span className="text-content">
            From operations dashboards and API integrations to
            React, Vue, Node.js, Python and Odoo. Check out
            my latest web software development portfolio projects.
          </span>
          <div className="portfolio-content">
            {
              data.allMarkdownRemark.edges.map((edge: any): any => {
                const { title, tags, image } = edge.node.frontmatter;
                const { slug } = edge.node.fields;
                const tagList = tags.split(', ');
                const imageSrc = portfolioImage(image);
                return (
                  <Link to={`/portfolio/${slug}`} key={slug}>
                    <div className="portfolio-content__boxes">
                      <div className="black-overlay"></div>
                      <div className="portfolio-content__header">{title}</div>
                      <img src={imageSrc} alt="" />
                      {tagList.map((tag: any): any => {
                        return (
                          <div className="portfolio-content__tags" key={tag}>{tag}</div>
                        )
                      })}
                      <div className="portfolio-content__tags">More...</div>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      
      </section>

    <div className="bg-circle-1"></div>
    <div className="bg-circle-2"></div>
    <div className="bg-circle-3"></div>
    
    </Layout>
  )
}

export default Portfolio

export const Head = () => <SEO title="Portfolio Page" />
