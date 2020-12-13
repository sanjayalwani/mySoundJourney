import React, { useState, useEffect } from 'react';
import PageContainer from '../components/MainUI/PageContainer';
import PlaylistListing from '../components/Playlist/Listing';
import {getPlaylists} from '../controllers/spotifyShaper';

const Playlists = props => {
    let access_token;
    if(document.cookie.includes("acc_tok")){
        access_token = document.cookie.split('=')[1];
    } 

    const [data, setData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const init = async () => {
        let d = await getPlaylists(access_token);
        setData(d);
        setIsLoaded(true)
    }
    useEffect(()=>init(), []);
   
    return (
        <PageContainer>
            <h1>Your Playlists</h1>
            {!isLoaded && <span> Loading ••• </span>}
        </PageContainer>
    );
}

export default Playlists;