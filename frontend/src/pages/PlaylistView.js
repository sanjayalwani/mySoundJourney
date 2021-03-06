import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistJourney } from "../controllers/spotifyShaper";
import getAccessToken from "../util/token";
import TrackTable from '../components/TrackTable/TrackTable';

const PlaylistView = props => {
  const access_tok = getAccessToken(document);
  let { playlistId } = useParams();
  // const playlistPromise = getPlaylists(access_tok);
  
  // const [pData, setpData] = useState(null)
  // const [isLoaded, setisLoaded] = useState(false);
  // useEffect(() => {
  //   playlistPromise.then(data => {
  //     setpData(data);
  //     setisLoaded(true);
  //   });
  // }, []);

  const [playlistData, setpData] = useState({playlist: null, playlistJourneyData: null})
  const [isLoaded, setisLoaded] = useState(false);

  // Load playlists
  useEffect(() => {
    console.log(playlistId);
    if (playlistId) {
      getPlaylistJourney(access_tok, playlistId).then(data => {
        setpData(data);
        setisLoaded(true);
      });
    }
  }, []);
  const { playlist, playlistJourneyData } = playlistData;
  
  return (
    <React.Fragment>
    {!isLoaded && <span>Playlist data is loading...</span>}
    {isLoaded && (
    <div>
      <h1>{playlist.name}</h1>
      
      {isLoaded && <TrackTable recent_tracks={playlistJourneyData} journey={false} />}
    </div>
    )}
    </React.Fragment>
  );
};

export default PlaylistView;
