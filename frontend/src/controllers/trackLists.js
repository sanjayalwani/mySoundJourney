import { AuthContext } from '../util/auth-context';
import React, { useContext } from 'react';

export const GetRecents = ( Spotify ) =>{
    
    let recents = [];
    const errors = [];
    Spotify.getMyRecentlyPlayedTracks().then(
        function(data) {
            recents = data.items;
        },
        function(err) {
            errors.push(err);
        }
    );
    if(recents==[]){
        Spotify.getMyRecentlyPlayedTracks().then(
            function(data) {
                recents = data.items;
            },
            function(err) {
                errors.push(err);
            }
        );
    }
    return recents;
}