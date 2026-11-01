module.exports = {
  siteMetadata: {
    title: `Dukstack - Fullstack Software Engineer`,
    description: `Kingsley Uche Nwakwuo {dukstack} - Fullstack Software Engineer with 7+ years' experience building web applications, operational dashboards and backend systems across JavaScript, Python and PHP.`,
    author: `Dukstack`,
    siteUrl: `https://dukstack.netlify.app`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dukstack-portfolio-site`,
        short_name: `dukstack`,
        lang: `en`,
        display: `standalone`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-transformer-remark`,
  ],
}
