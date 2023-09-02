import SpotifyWebApi from '../util/spotify-web-api';
const Spotify = new SpotifyWebApi();

const fetchRecents = async () => 
{
    let returnobj;
        await Spotify.getMyRecentlyPlayedTracks({limit: 50}).then(
            (data) => {
                returnobj = data.items;
            },
            (err) => {
                console.error(err);
            }
        );
    return returnobj;
}

/*
const fetchRecentsRecursively = async (before, countDown = 2) => 
{
  if (counter === maxCount) return [];
  console.log(counter);
  let items;
  await Spotify.getMyRecentlyPlayedTracks({ before, limit: 50 }).then(
    async (data) => {
      console.log({limit: 50, offset: counter * 50})
      items = data.items;
      if(data.next) {
        let nextItems = await(fetchRecents(counter + 1));
        console.log(nextItems)
        items = items.concat(nextItems);
      }
    },
    (err) => {
      console.error(err);
    }
  );
  return items;
}
 */

const getTrackFeatures = async (track_ids) => 
{
    let returnobj;
    await Spotify.getAudioFeaturesForTracks(track_ids).then(
        (data) => {
            returnobj = data.audio_features;
        },
        (err) => {
            console.error(err);
        }
    );
    return returnobj;
}
let getJourneyDataGate = false;

export const getJourneyData = async (access_token) =>
{
    let finalData;
    if(!getJourneyDataGate){
    Spotify.setAccessToken(access_token);
    let track_ids;
    let recentsData;
    let recentsFeatures;
    
    //console.log("Getting journey data try ");

    await fetchRecents()
        .then((res) => {
            //console.log(res);
            recentsData = res;
            return res;
        })
        .then((res) => {
            if(!res) throw Error("No response 1");
            else{
                track_ids = res.map(trackObj => trackObj.track.id);
                return track_ids;
            };
        })
        .then(async (track_ids) => {
            recentsFeatures = await getTrackFeatures(track_ids)
                .then(feat => {
                    //console.log(feat);
                    if(!recentsData) throw Error("No response 2" + recentsData);
                    else{
                        finalData = recentsData.map( (obj, idx) => {
                        return {...obj,
                                "energy": feat[idx].energy,
                                "valence": feat[idx].valence,
                                "danceability": feat[idx].danceability
                                }
                        });
                    } 
                });
        }
        )
        .catch((err)=> console.error(err));
    }
    return finalData;
}

export const getUsername = async (access_token) => 
{
    let returnobj;
    Spotify.setAccessToken(access_token);
    await Spotify.getMe().then(
        (data) => {
            returnobj = data.display_name;
        },
        (err) => {
            console.error(err);
        }
    );
    return returnobj;
}

// Loads all pages of playlists in a loop
export const getPlaylists = async (access_token, offset, limit) => {
    Spotify.setAccessToken(access_token);

    let currPlaylists = {previous: null, next: null, items: []};

    await Spotify.getUserPlaylists({'offset': offset, 'limit': limit}).then(
        (pData) => {
            Array.prototype.push.apply(currPlaylists.items, pData.items);
            currPlaylists.previous = pData.previous;
            currPlaylists.next = pData.next;
        },
        (err) => {
            console.error("Failed to get all playlists", err);
            throw Error(err);
        }
    )
    
    return currPlaylists;
}

export const fetchPlaylist = async (playlist_id, access_token) => {
    let returnobj;
    if (access_token) Spotify.setAccessToken(access_token);
    await Spotify.getPlaylist(playlist_id).then(
        (data) => {
            returnobj = data;
        },
        (err) => {
            console.error(err);
            returnobj = {error: err}
        }
    );
    return returnobj;
}

export const fetchPlaylistTracks = async (playlist_id, num_tracks) => {
  let trackPromises = [];
  let playlistTracks = [];
  for (let batch = 0; batch < num_tracks; batch += 100) {
    trackPromises.push(Spotify.getPlaylistTracks(playlist_id, { offset: batch }));
  }
  await Promise.all(trackPromises)
    .then(trackBatchArrays => {
      trackBatchArrays.forEach( trackBatch => {
        Array.prototype.push.apply(playlistTracks, trackBatch.items);
      })
    })
    .catch(err => {
      throw new Error(err);
    })

  return playlistTracks;
}

export const getPlaylistJourney = async (access_token, playlist_id) => {
  Spotify.setAccessToken(access_token);
  
  try {
    const playlist = await fetchPlaylist(playlist_id);

    const playlistTracks = await fetchPlaylistTracks(playlist_id, playlist.tracks.total);

    const playlistTrackIds = playlistTracks.map(trackObj => trackObj.track.id);

    const playlistTrackFeatures = await getTrackFeatures(playlistTrackIds);
    console.log(playlistTrackFeatures);
    const playlistJourneyData = playlistTracks.map((track, index) => {
      return track && {
        ...track,
        "energy": playlistTrackFeatures[index] && playlistTrackFeatures[index].energy,
        "valence": playlistTrackFeatures[index] && playlistTrackFeatures[index].valence,
        "danceability": playlistTrackFeatures[index] && playlistTrackFeatures[index].danceability
      }
    })
    return { playlist, playlistJourneyData };
  } catch (err) {
    return new Error(err)
  }

}