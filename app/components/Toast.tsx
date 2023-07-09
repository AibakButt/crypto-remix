import { FC } from "react";

type ToastType = "success" | "error"

interface IToast {
  message: string;
  type: ToastType
}

const Toast: FC<IToast> = ({ message, type }) => {
  return (
      <div className={type === "success" ? "bg-green-500 text-white py-2 px-4 rounded-md": "bg-red-500 text-white py-2 px-4 rounded-md"}>
        <span>{message}</span>
      </div>
  )
}

export default Toast;