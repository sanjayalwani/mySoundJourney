import React, { useEffect, useState, useRef } from 'react';
//React-vis import
import { AreaSeries, GradientDefs, HorizontalGridLines, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis, Highlight } from 'react-vis';
//Chart.js import for comparison
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
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
    const energyChart = useRef(undefined);
    const happyChart = useRef(undefined);
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
    
    //Chart.js data
    useEffect(() => {
        /*Chart.pluginService.register({
            afterUpdate: function(chart){
                chart.config.data.datasets[0]._meta[0].data[0]._model.pointStyle = img;
            }
        });*/
        if(energyChart.current!=undefined){
            energyChart.current.destroy();
        }
        const ctx = document.getElementById("energyChart");
        const energy_data = props.recent_tracks.map((val, idx) => (100*val.energy));
        const energy_opts = {
            labels: time_labels.slice(partitions[currentSession][0], partitions[currentSession][1]),
            datasets: [{
                fill: false,
                label: 'Energy',
                data: energy_data.slice(partitions[currentSession][0], partitions[currentSession][1]),
                borderColor: '#B91D82',
                backgroundColor: '#B91D82',
                pointRadius: 1,
                pointHitRadius: 15,
                pointStyle: images.slice(partitions[currentSession][0], partitions[currentSession][1]),
                lineTension: 0,
            }]
        };
        energyChart.current = new Chart(ctx, {
            type: 'line',
            data: energy_opts,
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                fill: false,
                scales: {
                    xAxes: [{
                        type: 'time',
                        display: true,
                        labelString: 'Date',
                        time: {
                            unit: 'minute'
                        },
                        ticks: {
                            suggestedMin: energy_data[partitions[currentSession][1]],
                            suggestedMax: energy_data[partitions[currentSession][0]]
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 100
                        },
                        legend: {
                            display: false
                        },
                        display: true
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return props.recent_tracks[tooltipItem[0].index + partitions[currentSession][0]].track.name;
                        },
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
        
                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                },
                distribution: 'linear',
                bounds: 'data'
            }
        });
        if(happyChart.current!=undefined){
            happyChart.current.destroy();
        }
        const happyctx = document.getElementById("happyChart");
        const happy_data = props.recent_tracks.map((val, idx) => (100*val.valence));
        const happy_opts = {
            labels: time_labels.slice(partitions[currentSession][0], partitions[currentSession][1]),
            datasets: [{
                fill: false,
                label: 'Positivity',
                data: happy_data.slice(partitions[currentSession][0], partitions[currentSession][1]),
                borderColor: '#1db954',
                backgroundColor: '#1db954',
                pointRadius: 1,
                pointHitRadius: 15,
                pointStyle: images.slice(partitions[currentSession][0], partitions[currentSession][1]),
                lineTension: 0,
            }]
        };
        happyChart.current = new Chart(happyctx, {
            type: 'line',
            data: happy_opts,
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                fill: false,
                scales: {
                    xAxes: [{
                        legend: {
                            display: false
                        },
                        type: 'time',
                        display: true,
                        labelString: 'Date',
                        time: {
                            unit: 'minute'
                        },
                        ticks: {
                            suggestedMin: happy_data[partitions[currentSession][1]],
                            suggestedMax: happy_data[partitions[currentSession][0]]
                        }
                    }],
                    yAxes: [{
                        legend: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 100
                        },
                        display: true
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return props.recent_tracks[tooltipItem[0].index + partitions[currentSession][0]].track.name;
                        },
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
        
                            if (label) {
                                label += ': ';
                            }
                            label += Math.round(tooltipItem.yLabel * 100) / 100;
                            return label;
                        }
                    }
                },
                distribution: 'linear',
                bounds: 'data'
            }
        });
        
    });

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

        <h2>Energy levels</h2>
        <canvas id="energyChart" height={window.innerWidth>700? "80px" : "120px"}></canvas>

        <h2>Happy levels</h2>
        <canvas id="happyChart" height={window.innerWidth>700? "80px" : "120px"}></canvas>
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