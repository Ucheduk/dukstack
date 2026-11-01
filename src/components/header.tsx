import { Link } from "gatsby";
import React, { useEffect, useState, Fragment} from "react";
import logo from '../assets/img/logo.png';

const Header = () => {

  const [mode, setMode] = useState(typeof window !== 'undefined' && window? localStorage.getItem('mode') : 'light');
  const checkMode = () => {
    if (mode === 'dark') {
      const root = document.querySelector(':root');
      const toggle = document.querySelector('.toggle');
      toggle.classList.add("dark-mode");
      root.style.setProperty('--bg-color', 'rgb(22, 7, 39)');
      root.style.setProperty('--font-color', '#4F3A65');
      root.style.setProperty('--primary-color', '#fff');
      root.style.setProperty('--box-shadow', 'rgba(255,255,255,0.35)');
    }
  }
  useEffect(() => checkMode(), [])

  const toggleMode = () => {
    const root = document.querySelector(':root');
    const toggle = document.querySelector('.toggle');
    // const bgColor = root.style.getPropertyValue('--bg-color')
    if (mode === 'dark') {
      root.style.setProperty('--bg-color', '#fff');
      root.style.setProperty('--font-color', '#fff');
      root.style.setProperty('--primary-color', '#4F3A65');
      root.style.setProperty('--box-shadow', 'rgba(0,0,0,0.35)');
      localStorage.setItem('mode', 'light');
      setMode('light')
    } else {
      root.style.setProperty('--bg-color', 'rgb(22, 7, 39)');
      root.style.setProperty('--font-color', '#4F3A65');
      root.style.setProperty('--primary-color', '#fff');
      root.style.setProperty('--box-shadow', 'rgba(255,255,255,0.35)');
      localStorage.setItem('mode', 'dark');
      setMode('dark')
    }
    toggle.classList.toggle("dark-mode");
  }

  const openMobileNav = () => {
    let mainHeader = document.querySelector(".main-header");
    let mobileNav = document.querySelector(".mobile-nav");
    let menu = document.querySelector(".menu");
    let close = document.querySelector(".close");
    let body = document.querySelector("body");
    body.style.overflow = 'hidden';
    if(mobileNav) mobileNav.classList.add("show");
    if(mainHeader) mainHeader.classList.add("open");
    if(menu) menu.classList.add("hide");
    if(close) close.classList.add("display");
  }

  const closeMobileNav = () => {
    let mainHeader = document.querySelector(".main-header");
    let mobileNav = document.querySelector(".mobile-nav");
    let menu = document.querySelector(".menu");
    let close = document.querySelector(".close");
    let body = document.querySelector("body");
    body.style.overflow = 'auto';
    if(mobileNav) mobileNav.classList.remove("show");
    if(mainHeader) mainHeader.classList.remove("open");
    if(menu) menu.classList.remove("hide");
    if(close) close.classList.remove("display");
  }
    return (
      <Fragment>
        <header className="main-header">
          <div className="container main-header-row">
            <Link to="/"><img className="main-header-logo" src={logo} alt="My Logo" /></Link>
            <nav className="main-header-nav">
              <ul>
                <li><Link onClick={closeMobileNav} to="/" className="underline-from-left" activeClassName="active">Home</Link></li>
                <li><Link onClick={closeMobileNav} to="/about" className="underline-from-left" activeClassName="active">About</Link></li>
                <li><Link onClick={closeMobileNav} to="/portfolio" className="underline-from-left" activeClassName="active">Portfolio</Link></li>
                <li><Link onClick={closeMobileNav} to="/contact" className="underline-from-left" activeClassName="active">Contact</Link></li>
              </ul>
            </nav>
            <i onClick={openMobileNav} className="zmdi zmdi-menu menu"></i>
            <i onClick={closeMobileNav} className="zmdi zmdi-close close"></i>
            <div className="toggle-wrapp">
              <span className="toggle" onClick={toggleMode}></span>
            </div>
          </div>
        </header>

        <nav className="mobile-nav">
          <div className="avatar">
            <div className="avatar-img"></div>
            <p>Uche Nwakwuo<br/>{'{dukstack}'}</p>
          </div>

          <ul>
            <li><Link onClick={closeMobileNav} to="/" className="underline-from-left" activeClassName="active">Home</Link></li>
            <li><Link onClick={closeMobileNav} to="/about" className="underline-from-left" activeClassName="active">About</Link></li>
            <li><Link onClick={closeMobileNav} to="/portfolio" className="underline-from-left" activeClassName="active">Portfolio</Link></li>
            <li><Link onClick={closeMobileNav} to="/contact" className="underline-from-left" activeClassName="active">Contact</Link></li>
          </ul> 
        </nav>
        
      </Fragment> 
  )
}

export default Header
