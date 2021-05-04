import { useEffect, useRef, useState } from "react";
import { firebase, firestore } from "../../firebase/config";
import Modal from "../common/Modal/Modal";
import TargetMenu from "../common/TargetMenu/TargetMenu";
import Timer from "../common/Timer/Timer";
import Toast from "../common/Toast/Toast";
import useModal from "../hooks/useModal";
import useToast from "../hooks/useToast";

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
  const [gameOver, setGameOver] = useState(false);
  const [toastMSG, toastShow, toastVariant, toastDisplay] = useToast();
  const imgRef = useRef<HTMLImageElement>(null);

  const [rulesModal, toggleRulesModal] = useModal(true);

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

  const handleMenuSelection = (target: LevelTarget) => {
    const {
      name,
      coords: [targetX, targetY],
    } = target;

    if (imgRef.current) {
      const clickX =
        (img.width * mousePosition[0]) / imgRef.current.offsetWidth;
      const clickY =
        (img.height * mousePosition[1]) / imgRef.current.offsetHeight;

      const threshold = 100;
      const clickMatch =
        Math.abs(targetX - clickX) < threshold &&
        Math.abs(targetY - clickY) < threshold;

      if (clickMatch) {
        setTargets((prev) => prev.filter((target) => target.name !== name));
        toastDisplay(`You found ${name}!`, 3000, "success");
      } else {
        toastDisplay("Keep looking", 3000, "danger");
      }
    }

    toggleTargetMenu();
  };

  return loadingGame ? (
    <p>Loading...</p>
  ) : (
    <>
      {rulesModal && (
        <Modal className="bg-gray-800 text-white rounded shadow p-4 font-bold text-center flex flex-col gap-4">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-4xl">Welcome to Photo Tagging App: PXL CON</h1>
            <p className="text-lg">
              You have to find certain characters to win the fastest you can
            </p>
            <p className="text-lg">Compete in a Leaderboard</p>

            <button className="p-4 bg-green-600 rounded-lg shadow font-bold uppercase my-4 hover:bg-green-400">
              Start
            </button>
          </div>

          <p className="text-lg">
            PXL CON is property of Jimmy Something, you can find more about him{" "}
            <a
              className="text-blue-400 hover:text-blue-200"
              href="https://pxlcon.jimmysomething.com/shop/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{" "}
          </p>
        </Modal>
      )}

      {toastShow && <Toast message={toastMSG} variant={toastVariant} />}

      {targetMenu && (
        <TargetMenu
          position={menuPosition}
          targets={targets}
          handleMenuSelection={handleMenuSelection}
        />
      )}

      {/* <Timer go={gameOver ? true : false} /> */}

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
