import { useEffect, useState } from "react";
import { formatTimePadding } from "../../../utils";

interface Props {
  go: boolean;
}

const Timer: React.FunctionComponent<Props> = ({ go }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    if (!go) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  });

  return (
    <div className="fixed bg-gray-800 text-white rounded shadow p-2 text-2xl font-bold left-2 top-2">
      {formatTimePadding(time)}
    </div>
  );
};

export default Timer;
