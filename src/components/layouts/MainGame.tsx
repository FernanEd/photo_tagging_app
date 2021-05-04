import { useState } from "react";
import Timer from "../common/Timer/Timer";
import Game from "./Game";

interface Props {}

const MainGame: React.FunctionComponent<Props> = () => {
  const [gameRunning, setGameRunning] = useState(false);

  const startGame = () => setGameRunning(true);

  const makeGameOver = () => setGameRunning(false);

  return (
    <>
      <Timer go={gameRunning ? true : false} />
      <Game startGame={startGame} makeGameOver={makeGameOver} />
    </>
  );
};
export default MainGame;
