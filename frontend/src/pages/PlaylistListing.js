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

    const [data, setData] = useState([]);
    let init = async () => {
        let d = await getPlaylists(access_token);
        setData(d);
    }
    useEffect(()=>init(),[]);
   
    return (
        <PageContainer>
            <h1>Your Playlists</h1>
            {data && data.length === 0? 
              (<span> Loading ••• </span>): 
              (data[0] == undefined?
                <span> Couldn't get your playlists </span>:
                <PlaylistListing playlists = {data} />
              ) 
            }
        </PageContainer>
    );
}

export default Playlists;