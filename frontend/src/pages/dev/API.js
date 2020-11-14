import React, { useState, useEffect } from 'react';
import PageContainer from '../../components/MainUI/PageContainer';
import {getJourneyData, getUsername, getPlaylists, fetchPlaylist} from '../../controllers/spotifyShaper';

const API = props => {
    let access_token;
    if(document.cookie.includes("acc_tok")){
        access_token = document.cookie.split('=')[1];
    } 

    const [data, setData] = useState("");
    const [dataType, setDataType] = useState("");

    useEffect(async () => {
        if(dataType.match(/playlist\/.+/)!=null){
            console.log("Playlist match")
            let d = await fetchPlaylist(dataType.split('/')[1]);
            setData(d);
        }
        if(dataType=="journey"){
            let d = await getJourneyData(access_token);
            setData(d);
        }
        if(dataType=="playlist"){
            let d = await getPlaylists(access_token);
            setData(d);
        }
        else{
            console.log("none of above", dataType)
        }
    }, [dataType]);
   
    return (
        <PageContainer>
            <h1>
                GET JSON response for: 
                <input value={dataType} 
                    onChange={e => setDataType(e.target.value)} 
                    placeholder="Request type" 
                />
            </h1>
            
            <p>
                {data}
            </p>
        </PageContainer>
    );
}

export default API;