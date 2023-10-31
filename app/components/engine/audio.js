import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {playingDuration, playingData, updatePlayerStats, saveNowPlaying} from '../../redux/store'
import API from './api'

let globalId;

async function Player([src, img, title, id]) {
    await TrackPlayer.reset();

    console.log(src, img, title, id)
    const radioTrack = {
        url: src, // Load media from the file system
        title: id,
        artist: title,
        artwork: img,
    };

    await TrackPlayer.add([radioTrack]);
    await TrackPlayer.play();
    globalId = id
}
function DurationViewer() {
    const progress = useProgress().position;
    let FormattedTime = TimeFormatter(progress);
    return FormattedTime
}

function TimeFormatter(progress) {
    var sec_num = parseInt(progress, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = '0'+hours;}
    if (minutes < 10) {minutes = '0'+minutes;}
    if (seconds < 10) {seconds = '0'+seconds;}

    return hours+':'+minutes+':'+seconds;
}

export default function Audio() {
    const radioPlaying = useSelector(state => state.radioPlaying);
    const src = radioPlaying.src;
    const img = radioPlaying.img
    const title = radioPlaying.title
    const id = radioPlaying.id

    const cmd = useSelector(state => state.audioCmd);
    const api = useSelector(state => state.infoFromAPI)

    const dispatch = useDispatch();

    // Calls Player every ID change
    useEffect(() => {
        if(id > 0) {
            Player([src, img, title, id]);  
        } else {
            TrackPlayer.setupPlayer()
        }
        dispatch(updatePlayerStats('playing'))
    }, [id]) 

    // Update duration on play
    dispatch(playingDuration(DurationViewer())) 

    // Calls timer on audio.js start
    useEffect(() => {
        const timer = setInterval(async () => {
            dispatch(playingData(await API(globalId)))
        }, 12500)

        return () => clearInterval(timer)
    }, [])

    // Save now playing songs to temp database
    const [nowPlayingHistory, setNowPlayingHistory] = useState([]);
    useEffect(() => {
       if(api.artist !== title && api.img && api.title !== title && api.img !== img) {
        const newData = {
            title: api.title,
            artist: title,
            img: api.img,
        }
        setNowPlayingHistory(old => [...old, newData]);
        dispatch(saveNowPlaying(nowPlayingHistory))
       }
    }, [api.title])

     // Calls AudioController every Remote Command received
     useEffect(() => {
        AudioController(cmd)
        dispatch(updatePlayerStats(cmd))
    }, [cmd])

    async function AudioController(cmd) {
        if(cmd == 'pause') {
            await TrackPlayer.pause()
        } else if (cmd == 'play') {
            await TrackPlayer.play()
            dispatch(updatePlayerStats('playing'))
        }
    }
}
