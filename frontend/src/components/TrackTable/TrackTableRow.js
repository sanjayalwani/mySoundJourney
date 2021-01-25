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

const rgbaify = (red = 255, green = 255, blue = 255, alpha = 1) => {
  red = (red > 255)? 255 : red;
  green = (green > 255)? 255 : green;
  blue = (blue > 255)? 255 : blue;
  alpha = (alpha > 255)? 255 : alpha;

  red = (red < 0)? 0 : red;
  green = (green < 0)? 0 : green;
  blue = (blue < 0)? 0 : blue;
  alpha = (alpha < 0.0)? 0.0 : alpha;

  return (`rgba(${red},${green},${blue},${alpha})`)
}

const colorWheel = {
  energy: (value) => {
    return rgbaify(percentColor(value), 30, 255-(percentColor(value)), 0.6);
  },
  valence: (value) => {
    return rgbaify(percentColor(value), cosColor(value), 255-percentColor(value), 0.6);
  }
}

const featureStyle = {
  energy: (value) => {
    return { backgroundColor: colorWheel.energy(value) };
  },
  valence: (value) => {
    return { backgroundColor: colorWheel.valence(value) };
  },
  energyGradient: (gradient) => {
    return { background: gradient}
  }, 
  valenceGradient: (gradient) => {
    return { background: gradient}
  }, 
}

const TrackTableRow = props => {
    const { trackObject, journey, gradient } = props;
    const { track, played_at, energy, valence } = trackObject;
    const { energyGradient, valenceGradient } = gradient;

    let listenTime;
    if (journey) {
      const listen_date = new Date(played_at);
      listenTime = `${listen_date.toDateString().slice(4,11)} ${listen_date.toLocaleTimeString('en-US')}`;
    }
    
    return (
    <tr className="track-table_row">
        <td><img src={track.album.images[2].url} alt={`Album: ${track.album.name}`}/></td>
        <td className="track-table_track">
            <span className="track-table_track_name">{track.name}</span>
            <span className="track-table_track_artists">{listArtists(track.artists)}</span>
        </td>
        <td className="track-table_runtime">{msToNormal(track.duration_ms)}</td>
        <td style={{fontSize: `${popToSize(track.popularity)}em`}}>{track.popularity}</td>
        <td style={featureStyle.energyGradient(energyGradient)}>{`${Math.round(energy*10000)/100}`}</td>
        <td style={featureStyle.valenceGradient(valenceGradient)}>{`${Math.round(valence*10000)/100}`}</td>
        {journey && <td className="track-table_time">{ listenTime }</td>}
    </tr>
    );
}

export default TrackTableRow;