// service.js
import TrackPlayer, {Event, useProgress} from 'react-native-track-player';

module.exports = async function() {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    // const progress = useProgress();
    

// The player is ready to be used
    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
}