import React, { useState, useEffect } from 'react';
import PageContainer from '../components/MainUI/PageContainer';
import JourneyTable from '../components/Journey/JourneyTable';
import JourneyStats from '../components/Journey/JourneyStats'
import { AuthContext } from '../util/auth-context';
import {getJourneyData, getUsername} from '../controllers/spotifyShaper';
//import SpotifyWebApi from '../util/spotify-web-api';
import {recentTracks as DUMMY_DATA, recentTracks} from '../components/Journey/RecentTrack';

const Journey = props => {
    //let auth = useContext(AuthContext);
    //console.log("Cookie => " + document.cookie);
    let access_token;
    if(document.cookie.includes("acc_tok")){
        access_token = document.cookie.split('=')[1];
    } 
    const [username, setUsername] = useState("");
    const [data, setData] = useState([]);
    
    let init = async () => {
        //auth.access_token
        let u = await getUsername(access_token);
        setUsername(u);
        let d = await getJourneyData(access_token);
        //let d = recentTracks;
        setData(d);
    }
    useEffect(()=>init(),[]);
   
    return (
        <PageContainer>
            <h1>Overview {username? `for ${username}` : ''}</h1>
            {data && data.length === 0 && <span> Loading ••• </span>}
            {data && data.length > 0 && <JourneyStats recent_tracks={data}/>}
            <h2> Listening History </h2>
            {data && data.length === 0 && <span> Loading ••• </span>}
            {data && data.length > 0 && <JourneyTable recent_tracks={data}/>}
        </PageContainer>
    );
}

export default Journey;