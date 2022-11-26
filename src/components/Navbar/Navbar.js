import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();
  return (
    <div className="navBar">
      <div className="searchBar">
        <FaSearch />
        <input type="text" placeholder="What do you want to listen to?" />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  );
}
