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
const JourneyRow = props => {
    let track = props.trackObject.track;
    return (
    <tr>
        <td><img src={track.album.images[2].url}/></td>
        <td>{`${track.name} by ${track.artists[0].name}`}</td>
        <td>{msToNormal(track.duration_ms)}</td>
        <td style={{fontSize: `${popToSize(track.popularity)}em`}}>{track.popularity}</td>
        <td>{props.trackObject.played_at}</td>
    </tr>
    );
}

export default JourneyRow;