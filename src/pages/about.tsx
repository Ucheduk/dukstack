import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = () => (
  <Layout>
    <section className="container home-section">
      <div className="img-wrapper">
          <div className="duk-image"></div>
        </div>
        <div className="home-section__content">
          <h1 className="title">About Me</h1>
          <span className="text-content">I am Kingsley Uche Nwakwuo, a Fullstack Software Engineer from Nigeria with 7+ years' experience
            building web applications, operational dashboards and backend systems across JavaScript, Python and PHP ecosystems.<br/><br/>
            I deliver end-to-end solutions — React/Node.js front ends, Python/Odoo integrations, and third-party API and
            reporting integrations — for distributed, international teams. I hold an MSc in Computer Science (Distinction)
            from the University of East London.<br/><br/>

            <strong>Experience</strong>
            <ul>
              <li>Fullstack Developer at <a className="underline-from-left" target='blank' href="https://lasoft.org/">LaSoft</a> (Remote), 2021 - Present.
                Built the <a className="underline-from-left" target='blank' href="https://lasoft.org/career">LaSoft careers page</a> with
                JazzHR API integration, and React-based operations dashboards with Google Maps, Power BI and Node.js/Python/Odoo
                back ends for Norconsult Telematics (KSA).</li>
              <li>Senior Frontend Developer at EZPark Limited, Lagos, 2020 - 2021.
                Built the customer-facing React web app for the <a className="underline-from-left" target='blank' href="https://app.parkinspace.ng/">ParkinSpace</a> parking
                management platform.</li>
              <li>Faculty Instructor at STPL Global, Lagos, 2018 - 2019.</li>
              <li>Andela Learning Community (ALC 3.0), 2015 - 2018. Completed the Google Africa Mobile Specialist programme.</li>
            </ul>
            <br/>

            <strong>Education</strong>
            <ul>
              <li>MSc Computer Science (Distinction), University of East London.</li>
              <li>Higher National Diploma, Project Management, OTHM.</li>
            </ul>
            <br/>

            <strong>My current toolset includes:</strong>
            <ul>
              <li>Languages - JavaScript, TypeScript, Python and PHP.</li>
              <li>Front End - React, React Native, Vue, Next.js and EJS.</li>
              <li>Back End - Node.js, Django, Flask, Laravel and Odoo.</li>
              <li>Databases - PostgreSQL, MySQL, MongoDB and Firebase.</li>
              <li>Cloud / DevOps - Docker, AWS and Heroku.</li>
              <li>AI Tooling - Prompt engineering, code generation and review (Copilot, GPT-based tools) and automated testing.</li>
              <li>Design - Figma, Photoshop and Illustrator.</li>
            </ul>
            <br/>
            Self-driven and adaptable, I have a strong track record of collaborating remotely across engineering
            and business stakeholders. If you have a project in mind, or an existing team that could use some
            help, <Link className="underline-from-left" to="/contact">contact me</Link>. I’ll fit in very quickly, I promise.
          </span>
        </div>
    </section>

  <div className="bg-circle-1"></div>
  <div className="bg-circle-2"></div>
  <div className="bg-circle-3"></div>

  </Layout>
)

export default About

export const Head = () => <SEO title="About - Uche Nwakwuo {Dukstack}" />
