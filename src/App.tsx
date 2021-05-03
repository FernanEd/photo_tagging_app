import React, { useState } from "react";
import Modal from "./components/common/Modal/Modal";
import TargetMenu from "./components/common/TargetMenu/TargetMenu";
import useModal from "./components/hooks/useModal";

const App: React.FunctionComponent = () => {
  const [sampleModal, toggleSampleModal] = useModal(false);
  const [targetMenu, toggleTargetMenu] = useModal(false);
  const [mousePosition, setMousePosition] = useState<Array<number, number>>([]);

  return (
    <>
      {sampleModal && <Modal>Hola como estas</Modal>}

      {targetMenu && <TargetMenu targets={["jose", "miguel", "pedro"]} />}

      <img
        src="https://firebasestorage.googleapis.com/v0/b/photo-tagging-app-e4b42.appspot.com/o/nMpQXwq.jpg?alt=media&token=6898d10e-f356-410c-b2fa-f202eda9b53f"
        alt=""
        className="w-full h-full overflow-auto"
        onClick={() => toggleTargetMenu()}
      />
    </>
  );
};

export default App;
