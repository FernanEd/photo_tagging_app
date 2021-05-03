import { useEffect, useRef, useState } from "react";
import { firestore } from "../../firebase/config";
import TargetMenu from "../common/TargetMenu/TargetMenu";
import useModal from "../hooks/useModal";

interface Props {}

export interface LevelImg {
  url: string;
  width: number;
  height: number;
}

export interface LevelTarget {
  coords: [number, number];
  name: string;
}

const Game: React.FunctionComponent<Props> = () => {
  const [img, setImg] = useState<LevelImg>({ url: "", width: 0, height: 0 });
  const [targets, setTargets] = useState<LevelTarget[]>([]);
  const [targetMenu, toggleTargetMenu] = useModal(false);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);

  const [loadingGame, setLoadingGame] = useState(true);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const getLevel = async () => {
      try {
        const res = await firestore
          .collection("levels")
          .doc("xH0h60xppbaXblqkDGS4")
          .get();
        const data = await res.data();
        if (data) {
          setImg(data.img);
          setTargets(data.targets);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingGame(false);
      }
    };

    getLevel();
  }, []);

  const handleClick: React.MouseEventHandler = (e) => {
    setMousePosition([e.pageX, e.pageY]);
    setMenuPosition([e.clientX, e.clientY]);
    toggleTargetMenu();
  };

  const handleMenuSelection = ([targetX, targetY]: [number, number]) => {
    if (imgRef.current) {
      const clickX =
        (img.width * mousePosition[0]) / imgRef.current.offsetWidth;
      const clickY =
        (img.height * mousePosition[1]) / imgRef.current.offsetHeight;

      console.log(clickX, clickY, targetX, targetY);

      const threshold = 100;
      const clickMatch =
        Math.abs(targetX - clickX) < threshold &&
        Math.abs(targetY - clickY) < threshold;

      if (clickMatch) {
        console.log("sucess");
      } else {
        console.log("failure");
      }
    }

    toggleTargetMenu();
  };

  return loadingGame ? (
    <p>Loading...</p>
  ) : (
    <>
      {targetMenu && (
        <TargetMenu
          position={menuPosition}
          targets={targets}
          handleMenuSelection={handleMenuSelection}
        />
      )}

      <img
        src="https://firebasestorage.googleapis.com/v0/b/photo-tagging-app-e4b42.appspot.com/o/nMpQXwq.jpg?alt=media&token=6898d10e-f356-410c-b2fa-f202eda9b53f"
        alt=""
        className=""
        onClick={handleClick}
        ref={imgRef}
      />
    </>
  );
};

export default Game;
