interface IconButtonProps {
  onClick?: () => void
  icon: string
}

const IconButton = (props: IconButtonProps) => {
  return (
    <div
      onClick={props.onClick}
      className={'cursor-pointer w-10 rounded-full h-10 flex justify-center items-center transition hover:bg-gray-100 active:bg-gray-200'}
    >
      <img src={props.icon} alt={'icon-btn'} />
    </div>
  )
}

export default IconButton
