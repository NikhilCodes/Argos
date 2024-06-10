import Header from "src/components/Header/Header";
import React from "react";

type BaseAppLayoutProps = {
  children?: React.ReactNode
}

const BaseAppLayout = ({ children }: BaseAppLayoutProps) => {
  return <>
    <Header/>
    <div id={'app'} className={'bg-white'}>
      {children}
    </div>
  </>
}

export default BaseAppLayout
