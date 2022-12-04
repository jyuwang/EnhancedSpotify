import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import _ from "lodash";
import axios from "axios";
import { reducerCases } from "../../utils/Constants";

/**
 * this component is at the top of the body
 * contains a search bar, and the displays the current user: search bar is currently not implemented
 * @returns a navbar
 */
export default function Navbar() {
  const [{ token, userInfo }, dispatch] = useStateProvider();

  const handleSearchChange = (e) => {
    const search = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${e.target.value}&type=track`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      const searchRes = {
        tracks: data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({
        type: reducerCases.SET_SEARCH_RESULTS,
        searchResults: searchRes,
      });
      dispatch({ type: reducerCases.SET_SEARCH_STATE, searchState: true });
    };
    search();
  };

  const handleSearchChangeDebounced = _.debounce(handleSearchChange, 1000);

  return (
    <div className="navBar">
      <div className="searchBar">
        <FaSearch />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          onChange={handleSearchChangeDebounced}
        />
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
