import React from "react";

const Footer = () => (
  
  <footer className="container main-footer">
    <div className="copyright">
      <p>&copy; {new Date().getFullYear()} Dukstack. Made with 💜 for Gatsby</p>
    </div>

    <div className="social social-footer">
        <a className="underline-from-left" target='blank' href="https://www.linkedin.com/in/uche-nwakwuo-12566067">
          <i className="zmdi zmdi-linkedin"></i>
        </a>

        <a className="underline-from-left" target='blank' href="https://twitter.com/dukstack">
          <i className="zmdi zmdi-twitter"></i>
        </a>

        <a className="underline-from-left" target='blank' href="https://www.instagram.com/dukstack">
          <i className="zmdi zmdi-instagram"></i>
        </a>

        <a className="underline-from-left" target='blank' href="https://www.facebook.com/uknwakwuo">
          <i className="zmdi zmdi-facebook"></i>
        </a>

        <a className="underline-from-left" target='blank' href="https://github.com/Ucheduk">
          <i className="zmdi zmdi-github"></i>
        </a>

        <a className="underline-from-left" target='blank' href="https://www.behance.net/nwakwuouche">
          <i className="zmdi zmdi-behance"></i>
        </a>
    </div>
  </footer>
)

export default Footer
