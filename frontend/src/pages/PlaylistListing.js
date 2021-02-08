import React, { useState, useEffect } from "react";
import PageContainer from "../components/MainUI/PageContainer";
import PlaylistListing from "../components/Playlist/Listing";
import { getPlaylists } from "../controllers/spotifyShaper";
import './PlaylistListing.css';

const Playlists = props => {
  let access_tok;
  if (document.cookie.includes("acc_tok")) {
    access_tok = document.cookie.split("=")[1];
  }
  const playlistPromise = getPlaylists(access_tok);
  
  const [pData, setpData] = useState(null)
  const [isLoaded, setisLoaded] = useState(false);
  useEffect(() => {
    playlistPromise.then(data => {
      setpData(data);
      setisLoaded(true);
    });
  }, []);

  return (
    <PageContainer>
      <h1>Your Playlists</h1>
      {!isLoaded && <span> Loading ••• </span>}
      
      {isLoaded && <PlaylistListing id="PList" playlists = {pData.items} />}

    </PageContainer>
  );
};

export default Playlists;
