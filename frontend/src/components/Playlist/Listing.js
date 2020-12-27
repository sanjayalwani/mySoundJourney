import React, { useRef, useState } from "react";

const PlaylistListing = (props) => {
  //3 cycle toggle default -> ascend -> descend -> default
  const [sortState, setsortState] = useState("default");
  const [sortType, setsortType] = useState("none");
  const sortIndices = useRef({ default: [] });

  if (props.playlists == undefined) {
    console.log(Object.keys(props));
    return <p>Error retrieving playlists</p>;
  }

  //Set it up with default ordering, once.
  if (sortIndices.current.default.length === 0) {
    let indices = [];
    for (let i = 0; i < props.playlists.length; i++) {
      indices.push(i);
    }
    sortIndices.current.default = indices;
  }

  const toggleHandler = (event, column) => {
    event.preventDefault();
    //if toggling on same column -> cycle up
    if (column === sortState) {
      if (sortType === "none") {
        setsortType("asc");
      } else if (sortType == "asc") {
        setsortType("desc");
      } else {
        setsortType("none");
        setsortState("default");
      }
    }
    //else toggle up from none, and set active column
    else {
      setsortType("asc");
      setsortState(column);
    }
    //do sorting on demand, once
    if (!Object.prototype.hasOwnProperty.call(sortIndices.current, column)) {
      let hashback = {}
      props.playlists.map((pobj,idx) => {
          hashback[pobj.id] = idx;
      })
      let sortedPlaylists = [...props.playlists];
      if (column === "playlist") {
        sortedPlaylists.sort((objA,objB) => {
            return objA.name.localeCompare(objB.name)
        });
      }
      if (column === "tracks") {
        sortedPlaylists.sort(
          (objA, objB) => {
            return objA.tracks.total - objB.tracks.total;
          }
        );
      }
      //extract id's in sorted order
      sortIndices.current[column] = sortedPlaylists.map((sortedObj) => {
        return hashback[sortedObj.id];
      });
    }
  };
  let currentIndices = sortIndices.current[sortState];
  if(sortState!=="default" && sortType==="desc"){
      //Deep copy and reverse
    currentIndices = [...sortIndices.current[sortState]]
    currentIndices = currentIndices.reverse();
  }
  
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th
            className={sortState === "playlist" ? sortType : ""}
            onClick={(e) => toggleHandler(e, "playlist")}
          >
            Playlist
          </th>
          <th
            className={sortState === "tracks" ? sortType : ""}
            onClick={(e) => toggleHandler(e, "tracks")}
          >
            Tracks
          </th>
        </tr>
      </thead>
      <tbody>
        {currentIndices.map((index) => {
          let playlist = props.playlists[index];
          return (
            <tr key={playlist.id}>
              <td>
                {playlist.images.length === 0 ? (
                  <span>no pic</span>
                ) : (
                  <img
                    className="playlistImage"
                    src={playlist.images[playlist.images.length - 1].url}
                    alt="Playlist cover"
                  />
                )}
              </td>
              <td>
                <a>{playlist.name}</a>
              </td>
              <td>{playlist.tracks.total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PlaylistListing;
