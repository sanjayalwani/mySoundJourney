import React from 'react';

import { msToTrackLength } from '../../util/helpers';

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
  },
  danceability: (value) => {
    return rgbaify(cosColor(value), 255-percentColor(value), 255-cosColor(value), 0.6);
  }
}

const featureStyle = {
  energy: (value) => {
    return { backgroundColor: colorWheel.energy(value) };
  },
  valence: (value) => {
    return { backgroundColor: colorWheel.valence(value) };
  },
  danceability: (value) => {
    return { backgroundColor: colorWheel.danceability(value) };
  }
}

const TrackTableRow = props => {
    const { trackObject, journey, visibleColumns } = props;
    const { track, played_at, energy, valence, danceability } = trackObject;

    let listenTime;
    if (journey) {
      const listen_date = new Date(played_at);
      listenTime = `${listen_date.toDateString().slice(4,11)} ${listen_date.toLocaleTimeString('en-US')}`;
    }
    
    const { images } = track.album;
    return (
      <tr className="track-table_row">
        {visibleColumns.trackCover && (
          <td className="align-middle">
            <img
              src={(images && images.length && images[images.length - 1].url) || "/msjspiral.png"}
              alt={`Album: ${track.album.name}`}
            />
          </td>
        )}
        {visibleColumns.track && (
          <td className="align-middle">
            <div className="track-table_track d-flex flex-column justify-content-center">
              <span className="track-table_track_name">{track.name}</span>
              <span className="track-table_track_artists">{listArtists(track.artists)}</span>
            </div>
          </td>
        )}
        {visibleColumns.length && (
          <td className="track-table_runtime align-middle">{msToTrackLength(track.duration_ms)}</td>
        )}
        {visibleColumns.popularity && <td className="align-middle">{track.popularity ? track.popularity : ""}</td>}
        {visibleColumns.energy && (
          <td className="align-middle track-color-cell" style={featureStyle.energy(energy)}>
            {`${(energy * 100).toFixed()}`}
          </td>
        )}
        {visibleColumns.positivity && (
          <td className="align-middle track-color-cell" style={featureStyle.valence(valence)}>
            {`${(valence * 100).toFixed()}`}
          </td>
        )}
        {visibleColumns.danceability && (
          <td className="align-middle track-color-cell" style={featureStyle.danceability(danceability)}>
            {`${(danceability * 100).toFixed()}`}
          </td>
        )}
        {journey && visibleColumns.playedAt && <td className="track-table_time align-middle">{listenTime}</td>}
      </tr>
    );
}

export default TrackTableRow;