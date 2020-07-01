import React from 'react';

const msToNormal = (milliseconds) => {
    let seconds = milliseconds/1000;
    let minutes = Math.floor(seconds/60);
    seconds = Math.floor(seconds%60);
    return `${minutes}:${seconds<10? `0${seconds}`: seconds}`;
}

const popToSize = (popularity) => {
    return (0.4 + popularity/80);
}

const percentColor = (percentage) => {
    return Math.floor(128-Math.cos(Math.PI*percentage)*127);
}
const cosColor = (percentage) => {
    return Math.floor((1-(Math.pow(percentage-1, 2)))*255)
}

const JourneyRow = props => {
    let track = props.trackObject.track;
    return (
    <tr>
        <td><img src={track.album.images[2].url} alt={`Album: ${track.album.name}`}/></td>
        <td>{`${track.name} by ${track.artists[0].name}`}</td>
        <td>{msToNormal(track.duration_ms)}</td>
        <td style={{fontSize: `${popToSize(track.popularity)}em`}}>{track.popularity}</td>
        <td style={{backgroundColor: `rgba(${percentColor(props.trackObject.energy)},30,${255-(percentColor(props.trackObject.energy))},0.6)`}}>{`${Math.round(props.trackObject.energy*10000)/100}%`}</td>
        <td style={{backgroundColor: `rgba(${percentColor(props.trackObject.valence)},${cosColor(props.trackObject.valence)},${255-percentColor(props.trackObject.valence)},0.6)`}}>{`${Math.round(props.trackObject.valence*10000)/100}%`}</td>
        <td>{props.trackObject.played_at}</td>
    </tr>
    );
}

export default JourneyRow;