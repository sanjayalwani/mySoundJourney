import React from 'react';

const PlaylistListing = props => {

    return (<table>
        <thead>
            <th></th>
        </thead>
        {props.playlists.map((playlist) => {
            <tr>
                <td></td>
                <td></td>
            </tr>
        })}
    </table>);
}

export default PlaylistListing