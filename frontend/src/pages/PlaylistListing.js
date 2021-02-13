import React, { useState, useEffect } from "react";
import PageContainer from "../components/MainUI/PageContainer";
import PlaylistListing from "../components/Playlist/Listing";
import { getPlaylists } from "../controllers/spotifyShaper";
import getAccessToken from "../util/token"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './PlaylistListing.css';
import PlaylistView from "./PlaylistView";

const Playlists = props => {
  let match = useRouteMatch();
  let { playlistId } = useParams();
  let access_tok = getAccessToken(document);
  const playlistPromise = getPlaylists(access_tok);
  
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
          {!isLoaded && <span> Loading ••• </span>}
          
          {isLoaded && <PlaylistListing id="PList" playlists={pData.items}/>}
        </Route>
        
      </Switch>
    </PageContainer>
  );
};

export default Playlists;
