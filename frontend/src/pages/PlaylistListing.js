import React, { useState, useEffect } from 'react';

// Components
import PageContainer from '../components/MainUI/PageContainer';
import PlaylistListing from '../components/Playlist/Listing';
import PlaylistView from './PlaylistView';
import LoadingIcon from '../components/MainUI/LoadingIcon';

// API
import { getPlaylists } from '../controllers/spotifyShaper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import { useAuth } from '../util/auth';

import './PlaylistListing.css';

// TODO: pagination of playlists + fix error n.track.totals undefined.

const Playlists = (props) => {
  const match = useRouteMatch();
  const { playlistId } = useParams();
  const { accessToken } = useAuth();
  const playlistPromise = getPlaylists(accessToken);
  
  const [pData, setpData] = useState(null)
  const [isLoaded, setisLoaded] = useState(false);
  
  // Load playlists
  useEffect(() => {
    console.log(playlistId);
    if (!playlistId) {
      playlistPromise.then(data => {
        setpData(data);
        setisLoaded(true);
      });
    }
  }, []);

  return (
    <PageContainer>
      <Switch>
        <Route path={`${match.path}/:playlistId`}>
          <PlaylistView playlistId={playlistId} />
        </Route>
        <Route path={match.path}>
          <h1>Your Playlists</h1>
          {!isLoaded && <LoadingIcon small />}
          
          {isLoaded && <PlaylistListing id="PList" playlists={pData.items}/>}
        </Route>
        
      </Switch>
    </PageContainer>
  );
};

export default Playlists;
