import React from 'react';

const PlaylistListing = props => {

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
            <tr>
                <td><img src={playlist.images[2]} alt="Playlist cover image"/></td>
                <td><a>{playlist.name}</a></td>
                <td>{playlist.tracks.total}</td>
            </tr>
        })}
        </tbody>
    </table>);
}

export default PlaylistListing