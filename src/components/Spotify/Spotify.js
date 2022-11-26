import React from "react";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar/Sidebar";

import "./Spotify.css";

export default function Spotify() {
  return (
    <div className="spotify">
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body__contents"></div>
          <Body />
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </div>
  );
}
