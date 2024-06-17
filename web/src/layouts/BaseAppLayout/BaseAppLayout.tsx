import Header from "src/components/Header/Header";
import React, {ReactNode} from "react";
import Footer from "src/components/Footer/Footer";
import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {motion} from "framer-motion";

type BaseAppLayoutProps = {
  children?: React.ReactNode
}

const BaseAppLayout = ({children}: BaseAppLayoutProps) => {
  return <>
    <Header/>
    <div id={'app'} className={'bg-white overflow-auto'}>
      {children}
    </div>
    <Footer/>
  </>
}

export default BaseAppLayout
