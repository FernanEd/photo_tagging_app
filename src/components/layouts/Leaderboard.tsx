import { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";

interface Props {}

const Leaderboard: React.FunctionComponent<Props> = () => {
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    const getScores = async () => {
      try {
        const res = await firestore.collection("games").get();
        for (const doc of res.docs) {
          doc.data();
        }

        if (res.docs) {
          console.log(res.docs);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingLeaderboard(false);
      }
    };

    getScores();
  });

  return <></>;
};

export default Leaderboard;
