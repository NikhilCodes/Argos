import {Metadata} from '@redwoodjs/web'
import Card from "src/components/Card/Card";
import {navigate, routes} from "@redwoodjs/router";
import {APP_NAME} from "src/constants";
import {ReactNode} from "react";
import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {motion} from 'framer-motion';
import {AuroraBackground} from "src/App";

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page"/>
      {/*<AuroraBackground>*/}
      {/*  <motion.div*/}
      {/*    initial={{opacity: 0.0, y: 40}}*/}
      {/*    whileInView={{opacity: 1, y: 0}}*/}
      {/*    transition={{*/}
      {/*      delay: 0.3,*/}
      {/*      duration: 0.8,*/}
      {/*      ease: "easeInOut",*/}
      {/*    }}*/}
      {/*    className="relative flex flex-col gap-4 items-center justify-center px-4"*/}
      {/*  >*/}
      <div
        className="flex flex-col items-center justify-center h-screen"
        style={{
          // backgroundImage: 'url(img/wavy.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'bottom'
        }}
      >
        <h1 className="text-4xl font-bold flex items-center gap-1">
          <img src={'icon.webp'} alt={'logo'} className={'w-14 h-14 scale-150'}/>
          {APP_NAME}
          <div className={'flex gap-1'}>
            <div
              className={'text-xs rounded-full px-2 py-0.5 bg-emerald-500 text-white'}>{process.env.REDWOOD_ENV_RELEASE_CYCLE}</div>
          </div>
        </h1>
        <div className={'flex flex-col md:flex-row gap-4 pb-20'}>
          <Card
            media={'img/monitors.webp'}
            className={'hover:shadow-cyan-300 hover:shadow-2xl'}
            onClick={() => {
              navigate(routes.monitor())
            }}
          >
            <div className={'font-bold text-xl'}>Monitors</div>
          </Card>

          <Card
            media={'img/configure-monitor.webp'}
            className={'hover:shadow-amber-300 hover:shadow-2xl'}
            onClick={() => {
              navigate(routes.configure())
            }}
          >
            <div className={'font-bold text-xl'}>Configure</div>
          </Card>
        </div>
        <div className={'fixed bottom-5'}>
          Copyright © {new Date().getFullYear()},&nbsp;
          <a className={'link link-primary no-underline font-semibold text-emerald-600'}
             href={'https://github.com/NikhilCodes'}>
            Nikhil Nayak
          </a>
        </div>
      </div>
      {/*</motion.div>*/}
      {/*</AuroraBackground>*/}
    </>
  )
}

export default HomePage
