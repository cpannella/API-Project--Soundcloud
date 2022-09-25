import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginFormModal";
import SignupFormPage from "./components/SignUpFormPage";
import SongPage from './components/Songs'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongDetail from "./components/Songs/songDetails";
import Player from "./components/AudioPlayer"
import CreateSongForm from "./components/Songs/createSongForm";
import SplashPage from "./components/SplashPage";
import EditSongForm from "./components/Songs/EditSongform";

function App() {
  const sessionUser = useSelector(state => state.session.user )
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true)
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>

          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/upload'>
             <CreateSongForm/>
          </Route>
          <Route exact path='/'>
            {!sessionUser && <SplashPage/> ? <SplashPage/> : <SongPage/>}

          </Route>
          <Route exact path='/edit/:id'>
            <EditSongForm/>
          </Route>
          <Route exact path='/songs/:id'>
            <SongDetail/>
          </Route>
        </Switch>
      )}
      <Player/>
    </>
  );
}

export default App;
