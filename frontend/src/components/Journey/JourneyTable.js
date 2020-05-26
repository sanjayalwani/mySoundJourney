import React, { useState } from 'react';

import JourneyRow from './JourneyRow';

import './JourneyTable.css';

//Data fetch cycle to occur on mounting with useEffect() hook
//we may move this up a layer as journey might need to pass the object to an overview panel too..
import {recentTracks as DUMMY_DATA} from './RecentTrack';


const JourneyTable = props => {

    return (
        <table className="journey-table">
            <tr>
                <th>Cover</th>
                <th>Track Name + Artist</th>
                <th>Runtime</th>
                <th>Popularity</th>
                <th>Played at</th>
            </tr>
            {DUMMY_DATA.items.map( trackObj => <JourneyRow trackObject={trackObj}/>)}
        </table>
    );
}

export default JourneyTable;