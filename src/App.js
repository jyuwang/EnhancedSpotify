import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import Spotify from "./components/Spotify/Spotify";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

export default function App() {
  function retrieveToken() {
    const hash = window.location.hash;
    return hash.substring(1).split("&")[0].split("=")[1];
  }

  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const token = retrieveToken();
    if (token) {
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return <div>{token ? <Spotify /> : <Login />}</div>;
}
