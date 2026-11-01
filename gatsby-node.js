const path = require('path');

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

// Declare the portfolio frontmatter so optional fields (e.g. image) can be left out
module.exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String
      date: String
      order: Int
      tags: String
      link: String
      image: String
      gallery: String
      desc: String
      content: String
      technologies: String
    }
  `)
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const portfolioTemplate = path.resolve('./src/templates/portfolio.tsx');
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (res.errors) {
    throw res.errors
  }

  res.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      component: portfolioTemplate,
      path: `/portfolio/${edge.node.fields.slug}/`,
      context: {
        slug: edge.node.fields.slug
      }
    })
  })
}
