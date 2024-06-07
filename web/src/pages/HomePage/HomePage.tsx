import {Metadata} from '@redwoodjs/web'
import Card from "src/components/Card/Card";
import {navigate, routes} from "@redwoodjs/router";

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page"/>
      <div className="flex flex-col items-center justify-center h-screen"
           style={{
             backgroundImage: 'url(img/wavy.svg)',
             backgroundSize: 'cover',
             backgroundRepeat: "no-repeat",
             backgroundPosition: 'bottom'
           }}>
        <h1 className="text-4xl font-bold flex items-center gap-1">
          OrbitalV
          <div className={'flex gap-1'}>
            <div className={'text-xs rounded-full px-2 py-0.5 bg-emerald-500 text-white'}>2.0</div>
            <div className={'text-xs rounded-full px-2 py-0.5 bg-cyan-400 text-white'}>dev</div>
          </div>
        </h1>
        <div className={'flex gap-4'}>
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
      </div>
    </>
  )
}

export default HomePage
