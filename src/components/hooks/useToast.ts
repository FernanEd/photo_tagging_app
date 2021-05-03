import { useState } from "react";
import Toast from "../common/Toast/Toast";

type toastVariants = "success" | "warning" | "danger" | "default";

const useToast = (): [
  string,
  boolean,
  toastVariants,
  (message: string, duration: number, variant: toastVariants) => void
] => {
  const [visibility, setVisibility] = useState(false);
  const [msg, setMsg] = useState("");
  const [variant, setVariant] = useState<toastVariants>("default");

  const [currentToggle, setCurrentToggle] = useState(0);

  const displayToast = (
    message: string,
    duration: number,
    variant: toastVariants
  ) => {
    setMsg(message);
    setVariant(variant);
    setVisibility(true);

    setTimeout(() => {
      setVisibility(false);
    }, duration);
  };

  return [msg, visibility, variant, displayToast];
};

export default useToast;
