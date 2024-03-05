import React, { useState } from 'react';
import TrackTableRow from './TrackTableRow';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import './TrackTable.css';

const TrackTable = props => {

    const { recent_tracks, journey } = props;
    const [visibleColumns, setVisibleColumns] = useState({
      trackCover: true,
      track: true,
      length: true,
      popularity: true,
      energy: true,
      positivity: true,
      danceability: true,
      playedAt: true,
    });

    return (
      <div>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {/*}
            <input type="checkbox" id="trackCover" name="trackCover" checked={visibleColumns.trackCover} onChange={() => setVisibleColumns({...visibleColumns, trackCover: !visibleColumns.trackCover})} />
            <label htmlFor="trackCover">Track Cover</label>
            <input type="checkbox" id="track" name="track" checked={visibleColumns.track} onChange={() => setVisibleColumns({...visibleColumns, track: !visibleColumns.track})} />
            <label htmlFor="track">Track</label>
            <input type="checkbox" id="length" name="length" checked={visibleColumns.length} onChange={() => setVisibleColumns({...visibleColumns, length: !visibleColumns.length})} />
            <label htmlFor="length">Length</label> */}
            <label className={visibleColumns.popularity? "btn btn-primary active" : "btn btn-primary"} htmlFor="popularity">
              <input type="checkbox" autocomplete="off" id="popularity" name="popularity" checked={visibleColumns.popularity} onChange={() => setVisibleColumns({...visibleColumns, popularity: !visibleColumns.popularity})} />
              Popularity
            </label>
            <label className={visibleColumns.energy? "btn btn-primary active" : "btn btn-primary"} htmlFor="energy">
              <input type="checkbox" autocomplete="off" id="energy" name="energy" checked={visibleColumns.energy} onChange={() => setVisibleColumns({...visibleColumns, energy: !visibleColumns.energy})} />
              Energy
            </label>
            <label className={visibleColumns.positivity? "btn btn-primary active" : "btn btn-primary"} htmlFor="positivity">
              <input type="checkbox" autocomplete="off" id="positivity" name="positivity" checked={visibleColumns.positivity} onChange={() => setVisibleColumns({...visibleColumns, positivity: !visibleColumns.positivity})} />
              Positivity
            </label>
            <label className={visibleColumns.danceability? "btn btn-primary active" : "btn btn-primary"} htmlFor="danceability">
              <input type="checkbox" autocomplete="off" id="danceability" name="danceability" checked={visibleColumns.danceability} onChange={() => setVisibleColumns({...visibleColumns, danceability: !visibleColumns.danceability})} />
              Danceability
            </label>
            <label className={visibleColumns.playedAt? "btn btn-primary active" : "btn btn-primary"} htmlFor="playedAt">
              <input type="checkbox" autocomplete="off" id="playedAt" name="playedAt" checked={visibleColumns.playedAt} onChange={() => setVisibleColumns({...visibleColumns, playedAt: !visibleColumns.playedAt})} />
              Played At
            </label>
        </div>
        <MDBTable responsive className="track-table text-white">
          <MDBTableHead>
            <tr>
              {visibleColumns.trackCover && <th title="Track cover"></th>}
              {visibleColumns.track && <th title="Track name and artist(s)">Track</th>}
              {visibleColumns.length && <th className="track-table_runtime" title="Length in minutes:seconds"><span>Length</span></th>}
              {visibleColumns.popularity && <th><span className="track-table_popularity" title="Popularity out of 100">Popularity (%)</span></th>}
              {visibleColumns.energy && <th><span className="track-table_energy" title="Energy out of 100">Energy (%)</span></th>}
              {visibleColumns.positivity && <th><span className="track-table_positivity" title="Positivity out of 100">Positivity (%)</span></th>}
              {visibleColumns.danceability && <th><span className="track-table_danceability" title="Danceability out of 100">Danceability (%)</span></th>}
              {journey && visibleColumns.playedAt && <th className="track-table_time" title="When you listened to this track">Played at</th>}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {recent_tracks && recent_tracks.map((trackObj, index) => {
              if (trackObj.track) return (<TrackTableRow trackObject={trackObj} key={index} journey={journey} visibleColumns={visibleColumns}/>);
            })}
            {!recent_tracks && <tr><td>No tracks found.</td></tr>}
          </MDBTableBody>
        </MDBTable>
      </div>
    );

}

export default TrackTable;