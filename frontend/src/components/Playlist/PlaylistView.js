import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPlaylistJourney } from '../../controllers/spotifyShaper';
import { useAuth } from '../../util/auth';
import TrackTable from '../TrackTable/TrackTable';
import LoadingIcon from '../MainUI/LoadingIcon';

const PlaylistView = props => {
  const { accessToken } = useAuth();

  const { playlistId } = useParams();

  // const playlistPromise = getPlaylists(accessToken);
  
  // const [pData, setpData] = useState(null)
  // const [isLoaded, setisLoaded] = useState(false);
  // useEffect(() => {
  //   playlistPromise.then(data => {
  //     setpData(data);
  //     setisLoaded(true);
  //   });
  // }, []);

  const [playlistData, setpData] = useState({
    playlist: null,
    playlistJourneyData: null
  })
  const [isLoaded, setisLoaded] = useState(false);

  // Load playlists
  useEffect(() => {
    console.log(playlistId);
    if (playlistId) {
      getPlaylistJourney(accessToken, playlistId).then(data => {
        setpData(data);
        console.log(data);
        setisLoaded(true);
      });
    }
  }, []);

  console.log(playlistData)
  const { playlist, playlistJourneyData } = playlistData;
  
  return (
    <React.Fragment>
    {!isLoaded && <LoadingIcon small/>}
    {isLoaded && (
    <div>
      <h1>{playlist ? playlist.name : "error loading"}</h1>
      
      {isLoaded && playlistJourneyData && <TrackTable recent_tracks={playlistJourneyData} journey={false} />}
    </div>
    )}
    </React.Fragment>
  );
};

export default PlaylistView;
