import React, { useState, useEffect } from 'react';
import PageContainer from '../components/MainUI/PageContainer';
import PlaylistListing from '../components/Playlist/Listing';
import TrackChart from '../Statistics/TrackChart';
import {getPlaylists} from '../controllers/spotifyShaper';

const Playlists = props => {
    let access_token;
    if(document.cookie.includes("acc_tok")){
        access_token = document.cookie.split('=')[1];
    } 

    const [data, setData] = useState({loaded: false});
    let init = async () => {
        let d = await getPlaylists(access_token);
        setData(d);
    }
    useEffect(()=>init(),[]);
   
    return (
        <PageContainer>
            <h1>Your Playlists</h1>
            {data.loaded && (<span> Loading ••• </span>)}
            {data.error && <span> Couldn't get your playlists </span>}
            {data && data.items &&
                <PlaylistListing playlists = {data.items} />
            }
        </PageContainer>
    );
}

export default Playlists;