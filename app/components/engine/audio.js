import { useEffect, useState } from 'react';
import {ToastAndroid} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import TrackPlayer, {AppKilledPlaybackBehavior, Capability, useTrackPlayerEvents, Event } from 'react-native-track-player';
import {playingData, updatePlayerStats, saveNowPlaying, playRadio} from '../../redux/store'
import API from './api'

async function ClearPlayer() {
    await TrackPlayer.reset();
}

export default function AudioPlayer() {
    const radioPlaying = useSelector(state => state.radioPlaying);
    const img = radioPlaying.artwork
    const title = radioPlaying.title

    const cmd = useSelector(state => state.audioCmd);
    const api = useSelector(state => state.infoFromAPI);
    const reqId = useSelector(state => state.currentRadioId)
    const lib = useSelector(state => state.radioLibrary)

    const [isSetup, setSetup] = useState(false)
    const dispatch = useDispatch();

    // Calls Player every ID change
    useEffect(() => {
        if(reqId > 0 && isSetup) {
            Player()
            dispatch(updatePlayerStats('playing'))
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
            },
        });

        // TrackPlayer.updateOptions({
        //     capabilities: [
        //       TrackPlayer.CAPABILITY_PLAY,
        //       TrackPlayer.CAPABILITY_PAUSE,
        //       TrackPlayer.CAPABILITY_STOP,
        //       TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        //       TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
        //     ],
        //     compactCapabilities: [
        //       TrackPlayer.CAPABILITY_PLAY,
        //       TrackPlayer.CAPABILITY_PAUSE,
        //       TrackPlayer.CAPABILITY_STOP,
        //       TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        //       TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
        //     ]
        //   });

    }
    // Initialize queue for player
    async function PlayerQueueInit(lib) {
        setSetup(true)
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
    }
    // Run everytime user request a radio
    async function Player() {
        TrackPlayer.skip(reqId - 1)
        TrackPlayer.play()
        const activeTrack = await TrackPlayer.getTrack(reqId - 1)
        dispatch(playRadio(activeTrack))
    } 

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

    // Player Events
    const [playerState, setPlayerState] = useState('')
    const events = [
        Event.PlaybackState,
        Event.PlaybackError,
    ];
    useTrackPlayerEvents(events, (event) => {
        if (event.type === Event.PlaybackError) {
            ToastAndroid.show('An error occured while playing '+title, ToastAndroid.SHORT);
            ClearPlayer()
            dispatch(playRadio([]))
        }
        if (event.type === Event.PlaybackState) {
            setPlayerState(event.state);
        }
        if (event.type === Event.MetadataCommonReceived) {
            console.log(Event.MetadataCommonReceived)
        }
        });  

    // Function on every player event change
    useEffect(() => {
        dispatch(updatePlayerStats(playerState))
        const timer = setInterval(async () => {
            dispatch(playingData(await API(reqId)))
        }, 12500)

        return () => clearInterval(timer)
    }, [playerState]) 

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
    return null
}
