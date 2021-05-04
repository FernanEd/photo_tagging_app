import { useEffect, useState } from "react";

interface Props {
  go: boolean;
}

const Timer: React.FunctionComponent<Props> = ({ go }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (go) setTime((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time: number) => {
    const seconds = String(time % 60);
    const minutes = String((time / 60) | 0);

    return `${minutes.length === 1 ? "0" + minutes : minutes}:${
      seconds.length === 1 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div className="fixed bg-gray-800 text-white rounded shadow p-2 text-2xl font-bold left-2 top-2">
      {formatTime(time)}
    </div>
  );
};

export default Timer;
