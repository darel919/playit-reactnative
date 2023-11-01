import {API_ENDPOINT} from "@env"
import {State} from 'react-native-track-player';
export default async function API(id) {   
    let FormattedData = [];
    const player = State.Playing
    if(id && player === 'playing') {
                
        await fetch(API_ENDPOINT+'?playing_on='+id, {method: "POST",})
        .then((r) => r.json())
        .then((data) => {
            FormattedData = {
                title: data.songTitle,
                artist: data.songArtist,
                img: data.albumArt,
            }
        })
    }
    return FormattedData;
}