import clsx from "clsx"
import { Link } from "react-router-dom"
import { ButtonProps } from "../types/button"

const Button: React.FC<ButtonProps> = ({ onClick, url, text, icon, className }) => {

  return url ? (
    <Link
        to={url ?? ''}
        className={clsx(
            `w-max inline-flex items-center justify-center gap-2.5 text-center font-medium text-white hover:bg-opacity-90`, 
            "px-6",
            "py-4",
            "w-max",
            className
        )}
    >
      {
        icon ? (
          <span>
              {icon}
          </span>
        ) : null
      }
      <p className='w-max'>
          {text}
      </p>
    </Link>
  ) : (
    <div
      onClick={onClick}
      className={clsx(
          `w-max inline-flex items-center justify-center gap-2.5 text-center font-medium text-white hover:bg-opacity-90`, 
          "px-6",
          "py-4",
          "w-max",
          className
      )}
    >
      {
        icon ? (
          <span>
              {icon}
          </span>
        ) : null
      }
      <p className='w-max'>
          {text}
      </p>
    </div>
  );
}

export default Button
