import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import "./Searching.css";
import { AiFillClockCircle } from "react-icons/ai";
import { msToTime, playTrack } from "../Body/Body";


export default function Searching() {
  const [{ token, searchResults }, dispatch] = useStateProvider();
  return (
    <div class="body">
      {searchResults ? (
        <div>
          <div className="list">
            <div className="headerRow">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {searchResults.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number,
                          dispatch,
                          token
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="trackImage">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists.join(", ")}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToTime(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="noResults">No search result. Please try again.</div>
      )}
    </div>
  );
}
