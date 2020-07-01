import React, { useContext, useState, useEffect } from 'react';
import PageContainer from '../components/MainUI/PageContainer';
import JourneyTable from '../components/Journey/JourneyTable';
import { AuthContext } from '../util/auth-context';
import {getJourneyData, getUsername} from '../controllers/spotifyShaper';
//import SpotifyWebApi from '../util/spotify-web-api';
//import { response } from 'express';
//import axios from 'axios';

const Journey = props => {
    //let auth = useContext(AuthContext);
    console.log("Cookie => "+document.cookie);
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
        setData(d);
    }
    useEffect(()=>init(),[]);
    /*
    let Spotify = new SpotifyWebApi();
    Spotify.setAccessToken(auth.access_token);

    const fetchTracks = async () => {
            setData({tracks: data.tracks, isFetching: true, fetched: false});
            Spotify.getMyRecentlyPlayedTracks({limit: 50})
                .then(res => {
                    setData({tracks: res.items, isFetching: false, fetched: true});
                })
                .catch(err => {
                    console.log(err);
                    setData({tracks: data.tracks, isFetching: false, fetched: false})
                })
    }
    if(!data.isFetching && !data.fetched && data.tracks.length===0)
        setTimeout(()=>fetchTracks(),100);
        setInterval(()=>fetchTracks(), 15000);


    const fetchName = async () => {
            setUsername({name: username.name, isFetching: true, fetched: false});
            Spotify.getMe()
                .then(res => {
                    setUsername({name: res.display_name, isFetching: false, fetched: true});
                })
                .catch(err => {
                    console.log(err);
                    setUsername({name: username.name, isFetching: false, fetched: false})
                })
    }
    
    if(!username.isFetching && !username.fetched && username.name==='')
        setTimeout(()=>fetchName(),100);
    
    */
    return (
        <PageContainer>
            <p>Welcome {username? username: "Loading"}</p>
            <h2> Listening History </h2>
            {data && data.length === 0 && <span> Loading ••• </span>}
            {data && data.length > 0 && <JourneyTable recent_tracks={data}/>}
        </PageContainer>
    );
}

export default Journey;