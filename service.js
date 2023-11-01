// service.js
import TrackPlayer, {Event} from 'react-native-track-player';
module.exports = async function() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        console.log('Event.RemotePause');
        TrackPlayer.pause();
      });
    
      TrackPlayer.addEventListener(Event.RemotePlay, () => {
        console.log('Event.RemotePlay');
        TrackPlayer.play();
      });
// The player is ready to be used
    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
}