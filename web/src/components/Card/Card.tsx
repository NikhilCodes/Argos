import React from "react";
import {twMerge} from "tailwind-merge";

interface CardProps {
  media?: string
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

const Card = (props: CardProps) => {
  return (
    <div
      onClick={props.onClick}
      className={twMerge("group hover:invert bg-white cursor-pointer transition shadow rounded-lg overflow-hidden w-64 flex flex-col", props.className)}>
      {props.media && (
        <>
          <img alt="media" src={props.media}
               className="object-cover w-64 transform transition-transform duration-300 ease-in-out group-hover:scale-110"/>
        </>
      )}
      <div className="p-5">
        {props.children}
      </div>
    </div>
  )
}

export default Card
