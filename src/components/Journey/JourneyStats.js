import React, { useEffect, useRef, useState} from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBRow, MDBCol } from 'mdbreact';

import { getSessionInfo } from '../../util/helpers';
import TrackChart from '../Statistics/TrackChart';
import Chart from 'chart.js';

import './JourneyStats.css';
import PieChart from '../Statistics/PieChart';
import TripletColorDisplay from '../TrackTable/TripletColorDisplay';



// 5 minutes in ms
const SESSION_GAP = 5*60*1000;

const chartTypeNames = ['Energy', 'Positivity', 'Danceability'];
const chartTypeColors = ['#B91D82', '#1DB954', '#1D34B9'];

const JourneyStats = props => {
    
  const { recent_tracks } = props;

  const partitions = partitionSessions(recent_tracks);
  const time_labels = recent_tracks.map((val) => new Date(val.played_at));
  const [currentSession, setCurrentSession] = useState(0);
  const [currentChartType, setCurrentChartType] = useState(0);

  // Image initialization
  let images = recent_tracks.map((val) => {
        let img;
        if(window.innerWidth > 1000){
            img = new Image(30, 30);
        } else if(window.innerWidth > 700){
            img = new Image(21, 21);
        } else {
            img = new Image(14, 14);
        }
        img.src = val.track.album.images[2].url;
        img.style.border = "solid 1px green";
        img.style.borderRadius = "50%";
        return img;
    })

    const energy_data = recent_tracks.map((track) => (100 * track.energy));
    const valence_data = recent_tracks.map((track) => (100 * track.valence));
    const danceability_data = recent_tracks.map((track) => (100 * track.danceability));
    const chartTypeData = [energy_data, valence_data, danceability_data];
    
    const { sesh_length, sesh_day, sesh_time } = getSessionInfo(time_labels, partitions, currentSession, recent_tracks);
    
    // Calculate averages and trends for current session
    const session_tracks = recent_tracks.slice(partitions[currentSession][0], partitions[currentSession][1]);

    const avgPositivity = session_tracks.reduce((sum, track) => sum + track.valence, 0) / session_tracks.length;
    const avgEnergy = session_tracks.reduce((sum, track) => sum + track.energy, 0) / session_tracks.length;
    const avgDanceability = session_tracks.reduce((sum, track) => sum + track.danceability, 0) / session_tracks.length;

    return (
      <MDBCard color="black">
        <MDBCardHeader className="chart-nav">
          <MDBCardTitle>Chart</MDBCardTitle>
          <MDBRow>
            <MDBCol size="4">
              <button
                disabled={currentChartType === 0}
                onClick={event => {
                  event.preventDefault();
                  setCurrentChartType(0);
                }}
                className="chart-nav-energy w-100"
              >
                Energy
              </button>
            </MDBCol>
            <MDBCol size="4">
              <button
                disabled={currentChartType === 1}
                onClick={event => {
                  event.preventDefault();
                  setCurrentChartType(1);
                }}
                className="chart-nav-positivity w-100"
              >
                Positivity
              </button>
            </MDBCol>
            <MDBCol size="4">
              <button
                disabled={currentChartType === 2}
                onClick={event => {
                  event.preventDefault();
                  setCurrentChartType(2);
                }}
                className="chart-nav-danceability w-100"
              >
                Danceability
              </button>
            </MDBCol>
          </MDBRow>
        </MDBCardHeader>
        <MDBCardBody>
          <span className="session-title"><b>{sesh_length}</b> session on <b>{sesh_day}</b> at <b>{sesh_time}</b></span>
          <p>Avg Positivity: {avgPositivity.toFixed(2)}</p>
          <p>Avg Energy: {avgEnergy.toFixed(2)}</p>
          <p>Avg Danceability: {avgDanceability.toFixed(2)}</p>

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
          <div className="w-100">
            <TrackChart tracks = {recent_tracks}
                        images = {images}
                        chart_id = {"journeyChart"}
                        feature_data = {chartTypeData[currentChartType]}
                        x_data = {time_labels}
                        feature_label = {chartTypeNames[currentChartType]}
                        line_color = {chartTypeColors[currentChartType]}
                        current_slice = {partitions[currentSession]}
            />
          </div>
        </MDBCardBody>
    </MDBCard>
    );
}

//Returns indices of the different sessions
//Needs track.duration_ms
function partitionSessions(recentTracks)
{
    if(!recentTracks || recentTracks.length < 1){
        return undefined;
    }
    let sessions = [[0, 1]];
    let session_index = 0;
    let next_track_start = new Date(recentTracks[0].played_at);
    next_track_start = next_track_start.getTime();
    //We are moving backwards as the first element is the last played
    for(let i = 1; i<recentTracks.length; i++){
        let track_start = new Date(recentTracks[i].played_at);
        track_start = track_start.getTime();
        //For 'sequential' listens, next track must start within an interval
        let sequential_tolerance = recentTracks[i - 1].track.duration_ms + SESSION_GAP;
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