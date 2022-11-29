import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import Spotify from "./components/Spotify/Spotify";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

export default function App() {
  // gets the token from the url to make authenticated api calls later on
  function retrieveToken() {
    const hash = window.location.hash;
    return hash.substring(1).split("&")[0].split("=")[1];
  }

  const [{ token }, dispatch] = useStateProvider();
  // try and get a token
  // if it exists, update the state
  useEffect(() => {
    const token = retrieveToken();
    if (token) {
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  // if there is a token, move on to the app, if not, display the login screen
  return <div>{token ? <Spotify /> : <Login />}</div>;
}
