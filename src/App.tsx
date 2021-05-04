import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./components/layouts/Game";
import Leaderboard from "./components/layouts/Leaderboard";
import MainGame from "./components/layouts/MainGame";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <MainGame />
          </Route>
          <Route path="/leaderboard" exact={true}>
            <Leaderboard />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
