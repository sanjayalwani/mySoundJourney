import React from 'react';
import TrackTableRow from './TrackTableRow';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import './TrackTable.css';

const percentColor = (percentage) => {
  return Math.floor(128-Math.cos(Math.PI*percentage)*127);
}
const cosColor = (percentage) => {
  return Math.floor((1-(Math.pow(percentage-1, 2)))*255)
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
    return rgbaify(percentColor(value), 30, 255 - (percentColor(value)), 0.6);
  },
  valence: (value) => {
    return rgbaify(percentColor(value), cosColor(value), 255 - percentColor(value), 0.6);
  },
  energyArray: (value) => {
    return [percentColor(value), 30, 255 - (percentColor(value)), 0.6];
  },
  valenceArray: (value) => {
    return [percentColor(value), cosColor(value), 255 - percentColor(value), 0.6];
  }
}

const gradientify = (prev, current, next) => {
  const breakpoints = ['0%', '25%','75%', '100%'];
  return `linear-gradient(180deg, ${prev} ${breakpoints[0]}, ${current} ${breakpoints[1]}, ${current} ${breakpoints[2]}, ${next} ${breakpoints[3]})`;
}

const featureGradientMapper = (trackList) => {

  const featureColors = trackList.map(trackObj => {
    const { energy, valence, danceability } = trackObj;

    if ( energy === undefined || valence === undefined || danceability === undefined ) {
      throw new Error('A feature is missing from the track object list');
    }
    return {
      energyColor: colorWheel.energy(energy),
      valenceColor: colorWheel.valence(valence),
    };
  });

  const featureGradientColors = featureColors.map((trackObj, index) => {
    const { energyColor, valenceColor, /* danceabilityColor */ } = trackObj;

    const nextEnergyColor = (index === featureColors.length - 1) 
      ? energyColor
      : featureColors[index + 1]['energyColor'];
    const nextValenceColor = (index === featureColors.length - 1) 
      ? valenceColor
      : featureColors[index + 1]['valenceColor'];
    
    const energyGradient = gradientify(energyColor, nextEnergyColor);
    const valenceGradient = gradientify(valenceColor, nextValenceColor);

    return {
      energyGradient,
      valenceGradient,
    }
  });

  return featureGradientColors;
}

const advancedFeatureGradientMapper = (trackList) => {

  const featureColorArrays = trackList.map(trackObj => {
    const { energy, valence, danceability } = trackObj;

    if ( energy === undefined || valence === undefined || danceability === undefined ) {
      throw new Error('A feature is missing from the track object list');
    }
    return {
      energyColor: colorWheel.energyArray(energy),
      valenceColor: colorWheel.valenceArray(valence),
    };
  });

  // Produce rgba strings for tracks and their midpoints
  const featureGradientColors = [];
  featureColorArrays.forEach( (trackObj, index) => {
    const { energyColor, valenceColor, /* danceability */ } = trackObj;
    // Push color of track being iterated on
    featureGradientColors.push({
      energyColor: rgbaify(...energyColor),
      valenceColor: rgbaify(...valenceColor),
    })

    // Calculate midpoint color of current and next track
    if (index !== trackList.length - 1) {
      const midpointEnergyColor = [
        (featureColorArrays[index + 1]['energyColor'][0] + energyColor[0])/2.0,
        (featureColorArrays[index + 1]['energyColor'][1] + energyColor[1])/2.0,
        (featureColorArrays[index + 1]['energyColor'][2] + energyColor[2])/2.0,
        energyColor[3],
      ];
      const midpointValenceColor = [
        (featureColorArrays[index + 1]['valenceColor'][0] + valenceColor[0])/2.0,
        (featureColorArrays[index + 1]['valenceColor'][1] + valenceColor[1])/2.0,
        (featureColorArrays[index + 1]['valenceColor'][2] + valenceColor[2])/2.0,
        valenceColor[3],
      ];
      featureGradientColors.push({
        energyColor: rgbaify(...midpointEnergyColor),
        valenceColor: rgbaify(...midpointValenceColor),
      })
    }
  });

  // Finally produce gradients
  const featureGradients = [];
  for (let index = 0; index < featureGradientColors.length; index += 2) {
    const { energyColor, valenceColor, /* danceabilityColor */ } = featureGradientColors[index];

    const prevEnergyColor = index ? featureGradientColors[index - 1]['energyColor'] : energyColor;
    const prevValenceColor = index ? featureGradientColors[index - 1]['valenceColor'] : valenceColor;
    const nextEnergyColor = (index === featureGradientColors.length - 1) 
      ? energyColor
      : featureGradientColors[index + 1]['energyColor'];
    const nextValenceColor = (index === featureGradientColors.length - 1) 
      ? valenceColor
      : featureGradientColors[index + 1]['valenceColor'];
    
    const energyGradient = gradientify(prevEnergyColor, energyColor, nextEnergyColor);
    const valenceGradient = gradientify(prevValenceColor, valenceColor, nextValenceColor);
  
    featureGradients.push({
      energyGradient,
      valenceGradient,
    });
  }

  return featureGradients;
}

const TrackTable = props => {

    const { recent_tracks, journey } = props;
    const featureGradients = advancedFeatureGradientMapper(recent_tracks);

    return (
      <MDBTable responsive borderless className="track-table text-white">
        <MDBTableHead>
          <tr>
            <th title="Track cover"></th>
            <th title="Track name and artist(s)">Track</th>
            <th className="track-table_runtime" title="Length in minutes:seconds"><span>Length</span></th>
            <th><span className="track-table_popularity" title="Popularity out of 100">Popularity</span></th>
            <th><span className="track-table_energy" title="Energy out of 100">Energy</span></th>
            <th><span className="track-table_positivity" title="Positivity out of 100">Positivity</span></th>
            {journey && <th className="track-table_time" title="When you listened to this track">Played at</th>}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {recent_tracks && recent_tracks.map((trackObj, index) => {
            return (<TrackTableRow trackObject={trackObj} key={index} journey={journey} gradient={featureGradients[index]} />);
          })}
          {!recent_tracks && <tr><td>No tracks found.</td></tr>}
        </MDBTableBody>
      </MDBTable>
  );

}

export default TrackTable;