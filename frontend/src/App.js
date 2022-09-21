import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal";
import SignupFormPage from "./components/SignUpFormPage";
import SongPage from './components/Songs'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongDetail from "./components/Songs/songDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <SongPage/>
          </Route>
          <Route exact path='/songs/:id'>
            <SongDetail/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
