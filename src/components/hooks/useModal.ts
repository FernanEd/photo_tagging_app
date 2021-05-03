import { useState } from "react";

const useModal = (show = false): [boolean, Function] => {
  const [modalShow, setModalShow] = useState(show);

  const toggleModal = () => {
    setModalShow((show) => !show);
  };

  return [modalShow, toggleModal];
};

export default useModal;
