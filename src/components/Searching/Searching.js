import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import "./Searching.css";
import { AiFillClockCircle } from "react-icons/ai";
import { msToTime, playTrack } from "../Body/Body";
import { Pagination, ConfigProvider, theme } from "antd";
import { search } from "../Navbar/Navbar";

/**
 * this page shows the search results
 * @returns the search results page
 */
export default function Searching() {
  const [{ token, searchResults, searchTotal }, dispatch] = useStateProvider();
  const handleOnChange = (e) => {
    if (e === Math.ceil(parseInt(searchTotal / 10) / 10)) {
      const url = `https://api.spotify.com/v1/search?q=${
        document.getElementById("searchInput").value
      }&type=track&limit=${parseInt(searchTotal / 10) % 10}&offset=${
        (e - 1) * 8
      }`;
      search(url, dispatch, token);
    } else {
      const url = `https://api.spotify.com/v1/search?q=${
        document.getElementById("searchInput").value
      }&type=track&limit=10&offset=${(e - 1) * 5}`;
      search(url, dispatch, token);
    }
  };

  return (
    <div>
      {searchResults ? (
        <div>
          <div className="list">
            <div className="headerRow2">
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
          <div id="pagination">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#1ed760",
                },
                algorithm: theme.darkAlgorithm,
              }}
            >
              <Pagination
                showSizeChanger={false}
                showLessItems
                pageSize={10}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} songs`
                }
                showQuickJumper
                defaultCurrent={1}
                total={parseInt(searchTotal / 10)}
                onChange={handleOnChange}
              />
            </ConfigProvider>
          </div>
        </div>
      ) : (
        <div className="noResults">No search result. Please try again.</div>
      )}
    </div>
  );
}
