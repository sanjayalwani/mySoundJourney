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
    
    console.log("Getting journey data try ");

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
                    console.log(feat);
                    if(!recentsData) throw Error("No response 2"+recentsData);
                    else{
                        finalData = recentsData.map( (obj, idx) => {
                        return {...obj,
                                "energy": feat[idx].energy,
                                "valence": feat[idx].valence
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