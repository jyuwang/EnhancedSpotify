import React from "react";
import "./Sidebar.css";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "../Playlists/Playlists";

/**
 * this component is the sidebar
 * it contains home, search, your library buttons: which are currently disabled
 * @returns home, search, library buttons, playlists component
 */
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White-768x230.png"
            alt="Spotify Logo"
            id="spotifyLogo"
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </div>
  );
}
