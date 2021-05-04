import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.querySelector("#modal-root");
const modalBG = document.createElement("div");
modalBG.setAttribute(
  "class",
  "modal-bg fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center "
);

interface Props {
  toggle?: Function;
  [x: string]: any;
}

const Modal: React.FunctionComponent<Props> = ({
  children,
  toggle,
  ...props
}) => {
  const elRef = useRef(modalBG);

  const toggleOutsideModal = (e: any) => {
    if ([...e.target.classList].includes("modal-bg")) {
      if (toggle) {
        toggle();
      }
    }
  };

  useEffect(() => {
    modalRoot?.appendChild(elRef.current);
    elRef.current.addEventListener("click", toggleOutsideModal);

    return () => {
      modalRoot?.removeChild(elRef.current);
      elRef.current.removeEventListener("click", toggleOutsideModal);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="bg-white" {...props}>
      {children}
    </div>,
    elRef.current
  );
};

export default Modal;
