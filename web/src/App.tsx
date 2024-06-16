import {FatalErrorBoundary, RedwoodProvider} from '@redwoodjs/web'
import {RedwoodApolloProvider} from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'
import {RecoilRoot} from "recoil";
import {Toaster} from '@redwoodjs/web/toast'
import {SocketProvider} from "src/contexts/socketContext";
import React, {ReactNode} from "react";
import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {motion} from 'framer-motion'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <Toaster/>
      <RecoilRoot>
        <SocketProvider>
          <RedwoodApolloProvider>
            <Routes/>
          </RedwoodApolloProvider>
        </SocketProvider>
      </RecoilRoot>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AuroraBackground = (
  {
    className,
    children,
    showRadialGradient = true,
    ...props
  }: AuroraBackgroundProps
) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-200)_10%,var(--indigo-400)_15%,var(--blue-800)_20%,var(--violet-400)_25%,var(--red-200)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-30 will-change-transform`,

              showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  )
};

export default App
