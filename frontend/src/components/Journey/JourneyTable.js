import React, { useState, useContext, useEffect } from 'react';
import SpotifyWebApi from '../../util/spotify-web-api';
import { AuthContext } from '../../util/auth-context';
import JourneyRow from './JourneyRow';

import './JourneyTable.css';

//Data fetch cycle to occur on mounting with useEffect() hook
//we may move this up a layer as journey might need to pass the object to an overview panel too..
import {recentTracks as DUMMY_DATA} from './RecentTrack';


const JourneyTable = props => {
    /*let auth = useContext(AuthContext);

    let recent_tracks = props.recent_tracks;

    let final_tracks;
    
    let track_ids = recent_tracks.map(trackObj => trackObj.track.id);

    let data = {features: [], isFetching: false, fetched: false};

    let Spotify = new SpotifyWebApi();
    Spotify.setAccessToken(auth.access_token);

    //look to using a reducer for better efficiency, statefullness and rendering bye for now

    if(props.recent_tracks){
        if(props.recent_tracks.length>0){
            recent_tracks = props.recent_tracks;
        }
    }

    const joinTables = () =>{
        if(!Object.keys(recent_tracks[0]).find(key => key==="valence")){
            //Same length and not containing a feature from a join is a sufficient condition to join
            final_tracks = recent_tracks.map( (obj, idx) => {
                return {...obj,
                        "energy": data.features[idx].energy,
                        "valence": data.features[idx].valence}
            });
        }
    }

    const fetchFeatures = async () => {
            data = {features: data.features, isFetching: true, fetched: false};
            Spotify.getAudioFeaturesForTracks(track_ids)
                .then(res => {
                    if( res && res.audio_features.length>0 && res.audio_features[0] ){
                        data = {features: res.audio_features, isFetching: false, fetched: true};
                        joinTables();
                    }
                })
                .catch(err => {
                    console.log(err);
                    data = {features: data.features, isFetching: false, fetched: false}
                })
    }

    
    if(!data.isFetching && !data.fetched && data.features.length===0)
        setTimeout(()=>{if(!data.isFetching){fetchFeatures()}},150);

    
    //console.log('u got' + recent_tracks.length>0? recent_tracks.items[0].trackObject.track.name: '{blank}');
    //if(!data.fetched && data.isFetching && final_tracks===undefined){
        return (
            <table className="journey-table">
            <thead>
                <tr>
                    <th>Cover</th>
                    <th>Track Name + Artist</th>
                    <th>Runtime</th>
                    <th>Popularity</th>
                    <th>Energy</th>
                    <th>Valence</th>
                    <th>Played at</th>
                </tr>
            </thead>
            </table>
        )
    } else {*/

    let final_tracks = props.recent_tracks;
    console.log("Tracks object\n");
    console.log(final_tracks[0]);
    return (
        <table className="journey-table">
            <thead>
                <tr>
                    <th>Cover</th>
                    <th>Track Name + Artist</th>
                    <th>Runtime</th>
                    <th>Popularity</th>
                    <th>Energy</th>
                    <th>Positivity</th>
                    <th>Played at</th>
                </tr>
            </thead>
            <tbody>
                {final_tracks?final_tracks.map( (trackObj, index) => <JourneyRow trackObject={trackObj} key={index} />):<tr><td>sorry</td></tr>}
            </tbody>
        </table>
    );
//}
}

export default JourneyTable;