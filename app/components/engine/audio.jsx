import { useEffect, useState } from 'react';
import {ToastAndroid} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import TrackPlayer, {AppKilledPlaybackBehavior, Capability, useTrackPlayerEvents, Event, RepeatMode } from 'react-native-track-player';
import {playingData, updatePlayerStats, saveNowPlaying, playRadio} from '../../redux/store'
import API from './api'

export default function AudioService() {
    const radioPlaying = useSelector(state => state.radioPlaying);
    const img = radioPlaying.artwork
    const title = radioPlaying.title
    const id = radioPlaying.id

    const api = useSelector(state => state.infoFromAPI);
    const reqId = useSelector(state => state.currentRadioId)
    const lib = useSelector(state => state.radioLibrary)

    const [isSetup, setSetup] = useState(false)
    const dispatch = useDispatch();
    // Calls Player every ID change
    useEffect(() => {
        if(reqId > 0 && isSetup) {
            Player(reqId)
        } else if (reqId == 0 && !isSetup) {
            PlayerInit()
        }
    }, [reqId]) 

    useEffect(() => {
        if(lib.length > 0) {
            PlayerQueueInit(lib)
        }
    }, [lib]) 

    // Initialize player for first start
    async function PlayerInit() {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
              ],
              compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
              ],
              notificationCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
              ],
        });
    }
    // Initialize queue for player
    async function PlayerQueueInit(lib) {
        let localArray = []
        await lib.forEach(item => {
            localArray.push({
                id: item.id,
                url: item.src, // Load media from the file system
                title: item.title,
                artist: item.title,
                artwork: item.img,
                isLiveStream: true
            })
          });
        await TrackPlayer.add(localArray)
        await TrackPlayer.setRepeatMode(2)
        setSetup(true)
               
    }
    // Run everytime user request a radio
    async function Player(rID) {
        TrackPlayer.skip(rID - 1)
        TrackPlayer.play()
        const activeTrack = await TrackPlayer.getTrack(rID - 1)
        dispatch(playRadio(activeTrack))
    }
  
    // Player Events
    const [playerState, setPlayerState] = useState('')
    const events = [
        Event.PlaybackState,
        Event.PlaybackError,
        Event.PlaybackActiveTrackChanged
    ];
    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            ToastAndroid.show('An error occured while playing '+title, ToastAndroid.SHORT);
            dispatch(playRadio([]))
        }
        if (event.type === Event.PlaybackState) {
            setPlayerState(event.state);
            dispatch(updatePlayerStats(event.state))
        }
        if (event.type === Event.PlaybackActiveTrackChanged) {
            dispatch(playRadio(event.track)) 
        }
        if (event.type === Event.MetadataCommonReceived) {
            // console.log(Event.MetadataCommonReceived)
        }
    });  

    // Function on every player event change
    useEffect(() => {
        const instant = setInterval(async () => {
            if(playerState === 'playing' && id) {
                dispatch(playingData(await API(id)))
                clearInterval(instant)
            }
        }, 1000)
        const timer = setInterval(async () => {
            if(playerState === 'playing' && id) {
                dispatch(playingData(await API(id)))
            }
        }, 12500)
        return () => clearInterval(timer)
    }, [playerState || id]) 

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
        if(api.title && playerState === 'playing') {
            const radioTrack = {
                title: api.title,
                artist: title,
                artwork: api.img,
            };
            TrackPlayer.updateNowPlayingMetadata(radioTrack)
        }
    }, [api.title])
    return null
}