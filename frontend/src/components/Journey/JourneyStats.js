import React, { useEffect, useState} from 'react';
//Chart.js import for comparison
import {TrackChart} from '../Statistics/TrackChart';
import './JourneyStats.css';
const SESSION_GAP = 5*60*1000;      //5 minutes in milliseconds
//next up we will make a next previous toggle between sessions
//We will probably engage the react benefits to make this elegantly

//Also important is to have the song name pop up on hover over x coordinate
// or point specifically
const JourneyStats = props => {
    
    let partitions = partitionSessions(props.recent_tracks);
    const time_labels = props.recent_tracks.map((val, idx) => new Date(val.played_at));
    const [currentSession, setCurrentSession] = useState(0);
    
    //Image initialization
    let images = new Array(50);
    props.recent_tracks.map((val, idx) => {
        console.log(window.innerWidth);
        if(window.innerWidth>1000){
            images[idx] = new Image(30, 30);
        } else if(window.innerWidth>700){
            images[idx] = new Image(21, 21);
        } else {
            images[idx] = new Image(14, 14);
        }
        images[idx].src = val.track.album.images[2].url;
        images[idx].border = "solid 1px green;";
        images[idx].borderRadius = "50%";
    })

    const time_labels = props.recent_tracks.map((val, idx) => new Date(val.played_at));
    const energy_data = props.recent_tracks.map((val, idx) => (100*val.energy));

    let sesh_start = time_labels[partitions[currentSession][1] -1];
    let sesh_length = time_labels[partitions[currentSession][0]] - sesh_start + props.recent_tracks[partitions[currentSession][0]].track.duration_ms;
    sesh_length = `${(sesh_length>=3600000)? (Math.floor((sesh_length/60000)/60)+'h ') : ''}${Math.round((sesh_length/60000)%60)} min`
    let sesh_day = sesh_start.toDateString().slice(4,11);
    let sesh_time_h = sesh_start.getHours();
    let sesh_time_m = sesh_start.getMinutes();
    sesh_time_m = (sesh_time_m>9)? sesh_time_m : `0${sesh_time_m}`;
    let sesh_time = `${(sesh_time_h%12==0)? '12': (sesh_time_h%12)}:${sesh_time_m} ${((Math.floor(sesh_time_h/12))? 'PM' : 'AM')}`;
    return (
    <React.Fragment>
        <span className="session-title"><b>{sesh_length}</b> session on <b>{sesh_day}</b> at <b>{sesh_time}</b></span>
        <span className="session-control">
            <button
             className="session-control-button prev-button" 
             disabled={(currentSession===partitions.length-1)} 
             onClick={() => setCurrentSession(currentSession+1)}>
                PREVIOUS
            </button>
            <button 
             className="session-control-button next-button" 
             disabled={(currentSession===0)} 
             onClick={() => setCurrentSession(currentSession-1)}>
                NEXT
            </button>
        </span>
        <h2>Energy Chart</h2>
        <TrackChart tracks = {recent_tracks}
                    images = {images}
                    chart_id = {"energyChart"}
                    feature_data = {energy_data}
                    x_data = {time_labels}
                    feature_label = {"Energy"}
                    line_color = {"#B91D82"}
                    current_slice = {partitions[currentSession]}
        />

        <h2>Positivity Chart #1DB954</h2>
        
    </React.Fragment>
    );
}

//Returns indices of the different sessions
//Needs track.duration_ms
function partitionSessions(recentTracks)
{
    if(!recentTracks || recentTracks.length<1){
        return undefined;
    }
    let sessions = [[0,1]];
    let session_index = 0;
    let next_track_start = new Date(recentTracks[0].played_at);
    next_track_start = next_track_start.getTime();
    //We are moving backwards as the first element is the last played
    for(let i = 1; i<recentTracks.length; i++){
        let track_start = new Date(recentTracks[i].played_at);
        track_start = track_start.getTime();
        //For 'sequential' listens, next track must start within an interval
        let sequential_tolerance = recentTracks[i-1].track.duration_ms + SESSION_GAP;
        if(track_start+sequential_tolerance > next_track_start){
            sessions[session_index][1] += 1;
        } else {
            sessions.push([i, i+1]);
            session_index +=1;
        }
        next_track_start = track_start;
    }
    return sessions;
}
export default JourneyStats;