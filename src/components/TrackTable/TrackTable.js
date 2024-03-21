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

    // Sorting enums
    const sortColumn = {
      energy: 'energy',
      valence: 'valence',
      danceability: 'danceability',
      none: 'none'
    }

    const sortDirection = {
      asc: 'asc',
      desc: 'desc',
      none: 'none'
    }

    const getNextSortDirection = (currentDirection) => {
      switch (currentDirection) {
        case sortDirection.none:
          return sortDirection.asc;
        case sortDirection.asc:
          return sortDirection.desc;
        case sortDirection.desc:
          return sortDirection.none;
      }
    }


    // Sorting state functions
    const identityOrdering = recent_tracks.map((_, i) => i);
    // At index i of displayOrdering we'll have the ith track's index in the recent_tracks array
    const [displayOrdering, setDisplayOrdering] = useState(identityOrdering);
    const [sortedColumn, setSortedColumn] = useState(sortColumn.none);
    const [sortedDirection, setSortedDirection] = useState(sortDirection.none);

    const removeSorting = () => {
      setDisplayOrdering(identityOrdering);
      setSortedColumn(sortColumn.none);
      setSortedDirection(sortDirection.none);
    }

    const handleEnergyClick = () => {
      let currentDirection = sortDirection.none;
      if (sortedColumn == sortColumn.energy) currentDirection = sortedDirection;

      const nextDirection = getNextSortDirection(currentDirection);
      console.log(sortedColumn, sortedDirection, nextDirection);
      switch (nextDirection) {
        case sortDirection.none:
          removeSorting();
          return;
        case sortDirection.asc:
          const sortedTracks = [...recent_tracks].sort((a, b) => b.energy - a.energy);
          const sortedOrdering = sortedTracks.map(track => recent_tracks.indexOf(track));
          setDisplayOrdering(sortedOrdering);
          break;
        case sortDirection.desc:
          setDisplayOrdering(displayOrdering.slice().reverse());
      }
      setSortedColumn(sortColumn.energy);
      setSortedDirection(nextDirection);
    };

    const handleValenceClick = () => {
      let currentDirection = sortDirection.none;
      if (sortedColumn == sortColumn.valence) currentDirection = sortedDirection;

      const nextDirection = getNextSortDirection(currentDirection);
      console.log(sortedColumn, sortedDirection, nextDirection);
      switch (nextDirection) {
        case sortDirection.none:
          removeSorting();
          return;
        case sortDirection.asc:
          const sortedTracks = [...recent_tracks].sort((a, b) => b.valence - a.valence);
          const sortedOrdering = sortedTracks.map(track => recent_tracks.indexOf(track));
          setDisplayOrdering(sortedOrdering);
          break;
        case sortDirection.desc:
          setDisplayOrdering(displayOrdering.slice().reverse());
      }
      setSortedColumn(sortColumn.valence);
      setSortedDirection(nextDirection);
    };

    const handleDanceabilityClick = () => {
      let currentDirection = sortDirection.none;
      if (sortedColumn == sortColumn.danceability) currentDirection = sortedDirection;

      const nextDirection = getNextSortDirection(currentDirection);
      console.log(sortedColumn, sortedDirection, nextDirection);
      switch (nextDirection) {
        case sortDirection.none:
          removeSorting();
          return;
        case sortDirection.asc:
          const sortedTracks = [...recent_tracks].sort((a, b) => b.danceability - a.danceability);
          const sortedOrdering = sortedTracks.map(track => recent_tracks.indexOf(track));
          setDisplayOrdering(sortedOrdering);
          break;
        case sortDirection.desc:
          setDisplayOrdering(displayOrdering.slice().reverse());
      }
      setSortedColumn(sortColumn.danceability);
      setSortedDirection(nextDirection);
    };
    
    const getSortIcon = (sortColumn) => {
      if (sortColumn === sortedColumn) {
        if (sortedDirection === sortDirection.asc) {
          return <i className="fas fa-sort-up"></i>;
        } else if (sortedDirection === sortDirection.desc) {
          return <i className="fas fa-sort-down"></i>;
        }
      }
    }

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
              <input type="checkbox" autoComplete="off" id="popularity" name="popularity" checked={visibleColumns.popularity} onChange={() => setVisibleColumns({...visibleColumns, popularity: !visibleColumns.popularity})} />
              Popularity
            </label>
            <label className={visibleColumns.energy? "btn btn-primary active" : "btn btn-primary"} htmlFor="energy">
              <input type="checkbox" autoComplete="off" id="energy" name="energy" checked={visibleColumns.energy} onChange={() => setVisibleColumns({...visibleColumns, energy: !visibleColumns.energy})} />
              Energy
            </label>
            <label className={visibleColumns.positivity? "btn btn-primary active" : "btn btn-primary"} htmlFor="positivity">
              <input type="checkbox" autoComplete="off" id="positivity" name="positivity" checked={visibleColumns.positivity} onChange={() => setVisibleColumns({...visibleColumns, positivity: !visibleColumns.positivity})} />
              Positivity
            </label>
            <label className={visibleColumns.danceability? "btn btn-primary active" : "btn btn-primary"} htmlFor="danceability">
              <input type="checkbox" autoComplete="off" id="danceability" name="danceability" checked={visibleColumns.danceability} onChange={() => setVisibleColumns({...visibleColumns, danceability: !visibleColumns.danceability})} />
              Danceability
            </label>
            {journey && (
            <label className={visibleColumns.playedAt? "btn btn-primary active" : "btn btn-primary"} htmlFor="playedAt">
              <input type="checkbox" autoComplete="off" id="playedAt" name="playedAt" checked={visibleColumns.playedAt} onChange={() => setVisibleColumns({...visibleColumns, playedAt: !visibleColumns.playedAt})} />
              Played At
            </label>
            )}
        </div>
        <MDBTable responsive className="track-table text-white">
          <MDBTableHead>
            <tr>
              {visibleColumns.trackCover && <th title="Track cover"></th>}
              {visibleColumns.track && <th title="Track name and artist(s)">Track</th>}
              {visibleColumns.length && <th className="track-table_runtime" title="Length in minutes:seconds"><span>Length</span></th>}
              {visibleColumns.popularity && <th><span className="track-table_popularity" title="Popularity out of 100">Popularity (%)</span></th>}
              {visibleColumns.energy && <th><span className="track-table_energy" title="Energy out of 100" onClick={handleEnergyClick}>Energy (%) {getSortIcon(sortColumn.energy)}</span></th>}
              {visibleColumns.positivity && <th><span className="track-table_positivity" title="Positivity out of 100" onClick={handleValenceClick}>Positivity (%) {getSortIcon(sortColumn.valence)}</span></th>}
              {visibleColumns.danceability && <th><span className="track-table_danceability" title="Danceability out of 100" onClick={handleDanceabilityClick}>Danceability (%) {getSortIcon(sortColumn.danceability)}</span></th>}
              {journey && visibleColumns.playedAt && <th className="track-table_time" title="When you listened to this track">Played at</th>}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {displayOrdering && displayOrdering.map((trackIndex, displayIndex) => {
              const trackObj = recent_tracks[trackIndex];
              if (trackObj.track) return (<TrackTableRow trackObject={trackObj} key={trackIndex} journey={journey} visibleColumns={visibleColumns}/>);
            })}
            {!recent_tracks && <tr><td>No tracks found.</td></tr>}
          </MDBTableBody>
        </MDBTable>
      </div>
    );

}

export default TrackTable;