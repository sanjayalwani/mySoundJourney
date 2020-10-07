import React, { useEffect } from 'react';
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
    
    //React-vis data
    const mapped_energy = props.recent_tracks.map((val, idx) => {
        return {x: new Date(val.played_at), y: (100*val.energy)};
    });
    const mapped_valence = props.recent_tracks.map((val, idx) => {
        return {x: new Date(val.played_at), y: (100*val.valence)};
    });
    const mapped_pairs = props.recent_tracks.map((val, idx) => {
        return {x: (100*val.energy), y: (100*val.valence)};
    });

    let partitions = partitionSessions(props.recent_tracks);
    
    //Chart.js data
    useEffect(() => {
    const ctx = document.getElementById("myChart");
    const energy_data = props.recent_tracks.map((val, idx) => (100*val.energy));
    const energy_labels = props.recent_tracks.map((val, idx) => new Date(val.played_at));
    const energy_opts = {
        labels: energy_labels.slice(partitions[0][0], partitions[0][1]),
        datasets: [{
            fill: false,
            label: 'Listening history',
            data: energy_data.slice(partitions[0][0], partitions[0][1]),
            borderColor: '#1db954',
            backgroundColor: '#1db954',
            pointRadius: 1,
            pointHitRadius: 3,
            lineTension: 0,
        }]
    };
    new Chart(ctx, {
        type: 'line',
        data: energy_opts,
        options: {
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
                        suggestedMin: energy_data[partitions[0][1]],
                        suggestedMax: energy_data[partitions[0][0]]
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 100
                    },
                    display: true
                }]
            },
            distribution: 'linear',
            bounds: 'data'
        }
    });
    });
    //To implement:
    //  Time gap partitioning where Date difference between tracks should ≈ runtime of track
    //  This way we can group listening sessions and have more representative graphs
    //  This does stretch the x (time) axis tho, so we should add interactive sliding/scrolling down time next!
    //  Also add 'crosshairs' with track info as you hover over, that would be cool

    return (
    <React.Fragment>
    <link rel="stylesheet" type="text/css" href="path/to/chartjs/dist/Chart.min.css"></link>
    {/*<h2>Happiness-Energy Correlation</h2>
    <XYPlot height={300} width= {300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <MarkSeries data={mapped_pairs} />
    </XYPlot>*/}
    <h2>Happy levels(React-vis)</h2>
    <XYPlot height={300} width={900} xType="time" yDomain={[0,100]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <AreaSeries data={mapped_valence} color="black" curve={'curveMonotoneX'}/>
    </XYPlot>
    <h2>Energy levels(Chart.js)</h2>
    <canvas id="myChart" width="200px" height="200px"></canvas>
    <h2>Energy levels</h2>
    <XYPlot height={300} width={900} xType="time" yDomain={[0,100]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <GradientDefs>
            <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="red" stopOpacity={0.4}/>
            <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
            </linearGradient>
        </GradientDefs>
        <AreaSeries data={mapped_energy} color="green" curve={'curveMonotoneX'} fill={'url(#CoolGradient)'}/>
        <Highlight drag/>
    </XYPlot>
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