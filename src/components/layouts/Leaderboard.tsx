import { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
  const history = useHistory();

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

  const getSeconds = ({ start_time, end_time }: IScore) => {
    return Math.abs(start_time.seconds - end_time.seconds);
  };

  const handleReplay = () => {
    history.push("/");
  };

  return (
    <>
      {loadingLeaderboard ? (
        <p>Loading</p>
      ) : (
        <main className="bg-gray-800  rounded shadow p-4 text-white text-center  min-h-screen">
          <section>
            <button
              className="p-4 bg-green-600 rounded-lg shadow font-bold uppercase my-4 hover:bg-green-400"
              onClick={handleReplay}
            >
              Play again?
            </button>
          </section>

          <h1 className="text-4xl uppercase">The leaderboard</h1>
          <ul className="list-none flex flex-col gap-2 my-4 max-w-md mx-auto">
            {scores
              .filter(
                (score) => score.end_time && score.start_time && score.username
              )
              .sort((scoreA, scoreB) =>
                getSeconds(scoreA) > getSeconds(scoreB) ? 1 : -1
              )
              .map((score, i) => (
                <li
                  key={i}
                  className="p-2 bg-gray-600 text-center shadow rounded flex justify-between text-xl"
                >
                  <p>{score.username}</p>
                  <p>{formatScore(score)}</p>
                </li>
              ))}
          </ul>
        </main>
      )}
    </>
  );
};

export default Leaderboard;
