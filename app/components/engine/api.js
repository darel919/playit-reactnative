import {API_ENDPOINT} from "@env"
export default async function API(id) {   
    let FormattedData = [];
    
    if(id) {
                
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