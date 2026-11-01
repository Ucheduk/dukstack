import React, { ReactNode } from "react"

import Header from "./header"
import Footer from "./footer";
import "./layout.css"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="full-height-grow">
      <Header />
        {children}
      <Footer />
    </div>
  )
}

export default Layout
