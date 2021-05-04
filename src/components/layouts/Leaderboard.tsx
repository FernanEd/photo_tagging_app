import { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";
import { formatTimePadding } from "../../utils";

interface Props {}

interface IScore {
  start_time: {
    seconds: number;
    nanoseconds: number;
  };
  end_time: {
    seconds: number;
    nanoseconds: number;
  };
  username: string;
}

const Leaderboard: React.FunctionComponent<Props> = () => {
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [scores, setScores] = useState<IScore[]>([]);

  useEffect(() => {
    const getScores = async () => {
      try {
        const docs = await firestore.collection("games").get();

        const newScores: any[] = [];

        docs.forEach(async (doc) => {
          newScores.push(doc.data());
        });

        setScores(newScores);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingLeaderboard(false);
      }
    };

    getScores();
  }, []);

  const formatScore = ({ start_time, end_time }: IScore) => {
    return formatTimePadding(Math.abs(start_time.seconds - end_time.seconds));
  };

  return (
    <>
      {loadingLeaderboard ? (
        <p>Loading</p>
      ) : (
        <main className="bg-gray-800  rounded shadow p-4 text-white text-center  min-h-screen">
          <h1 className="text-4xl uppercase">The leaderboard</h1>
          <ul className="list-none flex flex-col gap-2 my-4">
            {scores.map((score, i) => (
              <li
                key={i}
                className="p-1 bg-gray-600 text-center rounded flex justify-between"
              >
                <p>{score.username}</p>
                <p>{formatScore(score)}</p>
              </li>
            ))}
          </ul>
          <section className="bg-gray-600"></section>
        </main>
      )}
    </>
  );
};

export default Leaderboard;
