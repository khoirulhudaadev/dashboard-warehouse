import clsx from "clsx"
import { Link } from "react-router-dom"
import { ButtonProps } from "../types/button"

const Button: React.FC<ButtonProps> = ({url, text, icon, className }) => {

  return (
    <Link
        to={url ?? ''}
        className={clsx(
            `w-max inline-flex items-center justify-center gap-2.5 text-center font-medium text-white hover:bg-opacity-90`, 
            "bg-red-600",
            "px-6",
            "py-4",
            "w-max",
            className
        )}
    >
    <span>
        {icon ? icon : <></>}
    </span>
    <p className='w-max'>
        {text}
    </p>
    </Link>
  )
}

export default Button
