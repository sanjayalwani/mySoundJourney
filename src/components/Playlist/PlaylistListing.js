import React, { useEffect, useState } from "react";
import { useLocation, useHistory , Link} from "react-router-dom";

import LoadingIcon from '../MainUI/LoadingIcon';
import { getPlaylists } from '../../controllers/spotifyShaper';
import { useAuth } from '../../util/auth';

import './PlaylistListing.css';

const PlaylistListing = () => {
  // Pagination code
  const history = useHistory();

  const queryParams = new URLSearchParams(useLocation().search);
  const offset = queryParams.get('offset') || 0;

  const handlePagination = (newOffset) => {
    const target = `/playlist?offset=${newOffset}`;
    history.push(target);
  };

  // Playlist request data structures
  const PLAYLIST_LIMIT = 20;
  
  const { accessToken } = useAuth();

  const playlistPromise = getPlaylists(accessToken, offset, PLAYLIST_LIMIT);
  
  const [currPlaylists, setcurrPlaylists] = useState(null)
  const [isLoaded, setisLoaded] = useState(false);
  
  // Load playlists
  useEffect(() => {
    playlistPromise.then(data => {
      setcurrPlaylists(data);
      setisLoaded(true);
    });
  }, [offset]);
  
  if (!isLoaded) {
    return <LoadingIcon small />;
  }

  return (
    <React.Fragment>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>
            Playlist
          </th>
          <th>
            Tracks
          </th>
        </tr>
      </thead>
      <tbody>
        {currPlaylists.items.map((playlist) => {
          return (
            <tr key={playlist.id}>
              <td>
                {playlist.images.length === 0 ? (
                  <span>No Cover</span>
                ) : (
                  <img
                    className="playlistImage"
                    src={playlist.images[playlist.images.length - 1].url}
                    alt="Playlist cover"
                  />
                )}
              </td>
              <td>
                <Link to={`playlist/${playlist.id}`}>{playlist.name}</Link>
              </td>
              <td>{playlist.tracks.total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <span className="playlist-paginator">
        <button
        className="playlist-paginator prev-button"
        disabled={(currPlaylists.previous === null)}
        onClick={() => { console.debug(`offset : ${Number(offset)}, ${Number(offset) - PLAYLIST_LIMIT}`); handlePagination(Math.max(0, Number(offset) - PLAYLIST_LIMIT));}}>
            PREVIOUS
        </button>
        <button 
        className="playlist-paginator next-button"
        disabled={(currPlaylists.next === null)}
        onClick={() => handlePagination(Number(offset) + PLAYLIST_LIMIT)}>
            NEXT
        </button>
    </span>
    </React.Fragment>
  );
};

export default PlaylistListing;
