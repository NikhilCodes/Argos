import Header from "src/components/Header/Header";
import React from "react";
import Footer from "src/components/Footer/Footer";

type BaseAppLayoutProps = {
  children?: React.ReactNode
}

const BaseAppLayout = ({ children }: BaseAppLayoutProps) => {
  return <>
    <Header/>
    <div id={'app'} className={'bg-white'}>
      {children}
    </div>
    <Footer/>
  </>
}

export default BaseAppLayout
