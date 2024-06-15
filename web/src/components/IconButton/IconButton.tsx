import {twMerge} from "tailwind-merge";

interface IconButtonProps {
  onClick?: () => void
  icon: string
  className?: string
}

const IconButton = (props: IconButtonProps) => {
  return (
    <div
      onClick={props.onClick}
      className={twMerge('cursor-pointer w-10 rounded-full h-10 flex justify-center items-center transition hover:bg-gray-100 active:bg-gray-200', props.className)}
    >
      <img src={props.icon} alt={'icon-btn'} />
    </div>
  )
}

export default IconButton
