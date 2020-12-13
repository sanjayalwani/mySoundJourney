import React from 'react';
import JourneyRow from './JourneyRow';
import './JourneyTable.css';

const JourneyTable = props => {

    let final_tracks = props.recent_tracks;
    
    return (
        <table className="journey-table">
            <thead>
                <tr>
                    <th>Cover</th>
                    <th>Track</th>
                    <th className="journey-table_runtime"><span>Length</span></th>
                    <th><span className="journey-table_popularity">Popularity</span></th>
                    <th><span className="journey-table_energy">Energy</span></th>
                    <th><span className="journey-table_positivity">Positivity</span></th>
                    <th className="journey-table_time">Played at</th>
                </tr>
            </thead>
            <tbody>
                {final_tracks?final_tracks.map( (trackObj, index) => <JourneyRow trackObject={trackObj} key={index} />):<tr><td>nothing here</td></tr>}
            </tbody>
        </table>
    );

}

export default JourneyTable;