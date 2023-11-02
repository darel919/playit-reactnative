import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import TrackPlayer, {} from 'react-native-track-player';

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

    // Calls AudioController every Remote Command received
    useEffect(() => {
        audioController()
    }, [cmd])

    async function audioController() {
        if (cmd === 'play') {
            await TrackPlayer.play()
        } else if(cmd === 'pause') {
            await TrackPlayer.pause()
        } else if(cmd === 'prev') {
            console.log('prev!')
            await TrackPlayer.skipToPrevious()
        } else if(cmd === 'next') {
            console.log('next!')
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


