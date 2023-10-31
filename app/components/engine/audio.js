import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import TrackPlayer, {useProgress, AppKilledPlaybackBehavior, Capability, useTrackPlayerEvents, Event, State } from 'react-native-track-player';
import {playingDuration, playingData, updatePlayerStats, saveNowPlaying} from '../../redux/store'
import API from './api'

let globalId;

async function Player([src, img, title, id]) {
    await TrackPlayer.reset();

    console.log(src, img, title, id)
    const radioTrack = {
        id: id,
        url: src, // Load media from the file system
        title: id,
        artist: title,
        artwork: img,
        isLiveStream: true
    };

    await TrackPlayer.add([radioTrack]);
    await TrackPlayer.play();
    TrackPlayer.updateOptions({
        android: {
            // This is the default behavior
            appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                // Capability.SkipToNext,
                // Capability.SkipToPrevious,
                // Capability.Stop,
              ],
              compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                // Capability.SkipToNext,
                // Capability.SkipToPrevious,
              ],
              notificationCapabilities: [
                Capability.Play,
                Capability.Pause,
                // Capability.SkipToNext,
                // Capability.SkipToPrevious,
              ],
        },
    });
    globalId = id
}

function DurationViewer() {
    const progress = useProgress().position;
    if(progress === 0) {
        return TimeFormatter(0)
    } else {
        let FormattedTime = TimeFormatter(progress);
        return FormattedTime
    }
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

export default function AudioPlayer() {
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
            // TrackPlayer.setupPlayer()
            Player([src, img, title, id]);  
            
        } else {
            TrackPlayer.setupPlayer()
        }
        dispatch(updatePlayerStats('playing'))
    }, [id]) 

    // Player Events
    const [playerState, setPlayerState] = useState(false)
    const isPlaying = playerState === State.Playing;
    const events = [
        Event.PlaybackState,
        Event.PlaybackError,
      ];
    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
          console.warn('An error occured while playing the current track.');
        }
        if (event.type === Event.PlaybackState) {
          setPlayerState(event.state);
          console.log(playerState)
        }
      });
      
    // Update Play Duration
    dispatch(playingDuration(DurationViewer()))

    // Calls timer on audio.js start
    useEffect(() => {
        const timer = setInterval(async () => {
            dispatch(playingData(await API(globalId)))
        }, 12500)

        return () => clearInterval(timer)
    }, [])

    // Function on API Changes
    const [nowPlayingHistory, setNowPlayingHistory] = useState([]);
    useEffect(() => {
        // Save now playing songs to temp database
        if(api.artist !== title && api.img && api.title !== title && api.img !== img) {
            const newData = {
                title: api.title,
                artist: title,
                img: api.img,
                }
            setNowPlayingHistory(old => [...old, newData]);
            dispatch(saveNowPlaying(nowPlayingHistory))
        }
        // Update Metadata on Notification
        if(api.title) {
            const radioTrack = {
                title: api.title,
                artist: title,
                artwork: api.img,
            };
            TrackPlayer.updateNowPlayingMetadata(radioTrack)
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
