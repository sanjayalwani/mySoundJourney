import React from 'react';

const PlaylistListing = props => {
    console.log("Listing called with:");
    console.log(props.playlists);
    if(props==undefined){
        console.log(Object.keys(props));
        return(<p>Error retrieving playlists</p>)
    }
    return (<table>
        <thead>
            <tr>
                <th>
                </th>
                <th>
                    Playlist
                </th>
                <th>
                    Tracks
                </th>
            </tr>
        </thead>
        <tbody>
        {props.playlists.map((playlist) => {
            return (<tr>
                <td><img src={playlist.images[2].url} alt="Playlist cover"/></td>
                <td><a>{playlist.name}</a></td>
                <td>{playlist.tracks.total}</td>
            </tr>)
        })}
        </tbody>
    </table>);
}

export default PlaylistListing