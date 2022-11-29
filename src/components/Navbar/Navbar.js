import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

/**
 * this component is at the top of the body
 * contains a search bar, and the displays the current user: search bar is currently not implemented
 * @returns a navbar
 */
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
