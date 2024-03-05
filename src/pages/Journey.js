import React, { useState, useEffect } from 'react';
import PageContainer from '../components/MainUI/PageContainer';
import TrackTable from '../components/TrackTable/TrackTable';
import JourneyStats from '../components/Journey/JourneyStats';
import { getJourneyData, getUsername } from '../controllers/spotifyShaper';
import LoadingIcon from '../components/MainUI/LoadingIcon';
import { useAuth } from '../util/auth';
// import { recentTracks as DUMMY_DATA, recentTracks } from '../components/Journey/RecentTrack';

const Journey = props => {
    // let auth = useContext(AuthContext);
    // console.log("Cookie => " + document.cookie);
    const { accessToken } = useAuth();

    const [username, setUsername] = useState("");
    const [data, setData] = useState([]);
    
    const init = async () => {
      // auth.access_token
      let u = await getUsername(accessToken);
      setUsername(u);
      let d = await getJourneyData(accessToken);
      // let d = recentTracks;
      setData(d);
      return;
    }
    // Implicit return of arrow function ruined you
    useEffect(() => {
        init();
    }, []);
   
    return (
      <PageContainer>
        <h1 className="text-left w-100">Overview {username? `for ${username}` : ''}</h1>
        {data && data.length === 0 && <LoadingIcon small />}
        {data && data.length > 0 && (
          <React.Fragment>
            <JourneyStats recent_tracks={data} />
            <h2> Listening History </h2>  
            <TrackTable recent_tracks={data} journey={true} />
          </React.Fragment>
        )}
      </PageContainer>
    );
}

export default Journey;
