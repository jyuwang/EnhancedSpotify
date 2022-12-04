import React, { useEffect } from "react";
import { useStateProvider } from "../../utils/StateProvider";
import axios from "axios";

import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Playing from "../Playing/Playing";

import "./Spotify.css";
import { reducerCases } from "../../utils/Constants";

/**
 * this is just a wrapper for all other components
 * @returns all the components of the app
 */
export default function Spotify() {
  const [{ token, lyricsState }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <div className="spotify">
      <div className="spotifyContent">
        <Sidebar />
        <div className="body">
          {lyricsState ? (
            <>
              <Playing />
            </>
          ) : (
            <>
              <Navbar />
              <div className="bodyContents">
                <Body />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="spotifyFooter">
        <Footer />
      </div>
    </div>
  );
}
