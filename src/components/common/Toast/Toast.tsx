import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.querySelector("#modal-root");
const modalBG = document.createElement("div");

interface Props {
  message: string;
  variant: "success" | "warning" | "danger" | "default";
}

const Toast: React.FunctionComponent<Props> = ({ variant, message }) => {
  const elRef = useRef(modalBG);

  useEffect(() => {
    modalRoot?.appendChild(elRef.current);

    return () => {
      modalRoot?.removeChild(elRef.current);
    };
  }, []);

  return ReactDOM.createPortal(
    <div
      className={`py-1 px-2 rounded shadow-lg mt-4 text-lg fixed top-2 left-1/2 transform -translate-x-1/2 ${(() => {
        switch (variant) {
          case "success":
            return "bg-green-600 text-white";
          case "warning":
            return "bg-yellow-600 text-black";
          case "danger":
            return "bg-red-600 text-white";
          default:
            return "bg-gray-600 text-white";
        }
      })()}`}
    >
      {message}
    </div>,
    elRef.current
  );
};

export default Toast;
