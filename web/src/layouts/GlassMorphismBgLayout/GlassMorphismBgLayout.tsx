import { ReactNode } from "react";

type GlassMorphismBgLayoutProps = {
  children?: ReactNode;
};

const GlassMorphismBgLayout = ({ children }: GlassMorphismBgLayoutProps) => {
  return (
    <div>
      {/*Box full of 3x8 dots*/}
      <div className={'absolute top-16 left-16'}>
        <div className={'grid grid-cols-8 grid-rows-3 gap-3'}>
          {Array.from({length: 24}).map((_, i) => (
            <div key={i} className={'bg-gray-200 rounded-full w-3 h-3'}/>
          ))}
        </div>
      </div>
      <div
        className={
          "backdrop-brightness-125 fragment absolute top-1/4 right-20 border-[1pt] border-solid border-gray-50 rounded-xl h-72 w-56 shadow-xl backdrop-blur z-10"
        }
      />
      {/* Some gradient coloured spheres */}
      <div
        className={
          "animate-move-around-2 fragment absolute top-20 right-10 h-52 w-52 rounded-full bg-gradient-to-br from-blue-700 to-cyan-400 z-[1]"
        }
      />
      <div
        className={
          "animate-grow fragment absolute top-80 right-24 h-64 w-64 rounded-full bg-gradient-to-br from-red-600 via-orange-600 to-orange-400 z-[1]"
        }
      />
      <div
        className={
          "fragment absolute bottom-12 left-[10rem] h-96 w-4 rounded-2xl bg-gradient-to-b from-emerald-800 via-emerald-400 to-lime-300 z-[1]"
        }
      />
      <div
        className={
          "fragment absolute bottom-12 left-[12rem] h-96 w-4 rounded-2xl bg-gradient-to-b from-emerald-800 via-emerald-400 to-lime-300 z-[1]"
        }
      />
      <div
        className={
          "fragment absolute bottom-12 left-[14rem] h-96 w-4 rounded-2xl bg-gradient-to-b from-emerald-800 via-emerald-400 to-lime-300 z-[1]"
        }
      />
      <div
        className={
          "fragment absolute bottom-12 left-[16rem] h-96 w-4 rounded-2xl bg-gradient-to-b from-emerald-800 via-emerald-400 to-lime-300 z-[1]"
        }
      />
      {/* Blurry circular glass on top */}
      <div
        className={
          "backdrop-hue-rotate-90 bg-gray-100 bg-opacity-15 animate-move-around fragment absolute bottom-1/4 left-14 w-80 h-80 border-[1pt] border-solid border-gray-200 rounded-full shadow-2xl z-10"
        }
      />
      <div className={"relative z-10"}>{children}</div>
    </div>
  );
};

export default GlassMorphismBgLayout;
