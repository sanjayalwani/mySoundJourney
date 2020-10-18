import React from 'react';

const msToNormal = (milliseconds) => {
    let seconds = milliseconds/1000;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds%60);
    return `${minutes}:${seconds<10? `0${seconds}`: seconds}`;
}

const popToSize = (popularity) => {
    let denominator = (window.innerWidth<700)? 110 : 80;
    return (0.4 + popularity/denominator);
}

const percentColor = (percentage) => {
    return Math.floor(128-Math.cos(Math.PI*percentage)*127);
}
const cosColor = (percentage) => {
    return Math.floor((1-(Math.pow(percentage-1, 2)))*255)
}

const listArtists = (artists) => {
    let artistsString = artists[0].name;
    if(artists.length>1){
        for(let i = 1; i<artists.length; i++){
            artistsString = artistsString.concat(`, ${artists[i].name}`);
        }
    }
    return (<span>{artistsString}</span>);
}

const JourneyRow = props => {
    let track = props.trackObject.track;
    let listen_date = new Date(props.trackObject.played_at);
    return (
    <tr className="journey-table_row">
        <td><img src={track.album.images[2].url} alt={`Album: ${track.album.name}`}/></td>
        <td className="journey-table_track">
            <span className="journey-table_track_name">{track.name}</span>
            <span className="journey-table_track_artists">{listArtists(track.artists)}</span>
        </td>
        <td className="journey-table_runtime">{msToNormal(track.duration_ms)}</td>
        <td style={{fontSize: `${popToSize(track.popularity)}em`}}>{track.popularity}</td>
        <td style={{backgroundColor: `rgba(${percentColor(props.trackObject.energy)},30,${255-(percentColor(props.trackObject.energy))},0.6)`}}>{`${Math.round(props.trackObject.energy*10000)/100}%`}</td>
        <td style={{backgroundColor: `rgba(${percentColor(props.trackObject.valence)},${cosColor(props.trackObject.valence)},${255-percentColor(props.trackObject.valence)},0.6)`}}>{`${Math.round(props.trackObject.valence*10000)/100}%`}</td>
        <td className="journey-table_time">{listen_date.toDateString().slice(4,11)} {listen_date.toLocaleTimeString('en-US')}</td>
    </tr>
    );
}

export default JourneyRow;