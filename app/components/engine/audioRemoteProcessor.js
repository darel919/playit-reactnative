import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import TrackPlayer, {} from 'react-native-track-player';
import { remoteCmd } from '../../redux/store'; 

export async function remoteFunction() {
    TrackPlayer.addEventListener("remote-play", () => {
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener("remote-pause", () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener("remote-previous", () => {
        TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener("remote-next", () => {
        TrackPlayer.skipToNext();
    });
}
export default function remoteProcess() {
    const cmd = useSelector(state => state.audioCmd);
    const dispatch = useDispatch()

    // Calls AudioController every Remote Command received
    useEffect(() => {
        if(cmd === '') {
        } else {
            audioController()
            dispatch(remoteCmd(''))
        }
        
    }, [cmd])

    async function audioController() {
        if (cmd === 'play') {
            await TrackPlayer.play()
        } else if(cmd === 'pause') {
            await TrackPlayer.pause()
        } else if(cmd === 'prev') {
            await TrackPlayer.skipToPrevious()
        } else if(cmd === 'next') {
            await TrackPlayer.skipToNext()
        } else if(cmd === 'shuffle') {
            console.log("Future release!")
        } 
    }

    TrackPlayer.addEventListener("remote-play", () => {
        console.log('Event.RemotePlay');
    });

    TrackPlayer.addEventListener("remote-pause", () => {
        console.log('Event.RemotePause');
    });

    TrackPlayer.addEventListener("remote-stop", () => {
        TrackPlayer.destroy();
    });
 
    return null
}


