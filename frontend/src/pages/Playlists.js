import React, { useState, useEffect } from 'react';

// Components
import PageContainer from '../components/MainUI/PageContainer';
import PlaylistListing from '../components/Playlist/Listing';
import PlaylistView from './PlaylistView';

// API
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation,
  useHistory
} from 'react-router-dom';

// TODO: pagination of playlists + fix error n.track.totals undefined.

const Playlists = (props) => {
  const match = useRouteMatch();
  const { playlistId } = useParams();

  return (
    <PageContainer>
      <Switch>
        <Route path={`${match.path}/:playlistId`}>
          <PlaylistView playlistId={playlistId} />
        </Route>
        <Route path={match.path}>
          <h1>Your Playlists</h1>
          <PlaylistListing id="PList" />
        </Route>
        
      </Switch>
    </PageContainer>
  );
};

export default Playlists;
