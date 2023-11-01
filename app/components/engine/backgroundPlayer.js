// service.js
import TrackPlayer, {Event} from 'react-native-track-player';
export async function PlaybackService() {
    TrackPlayer.addEventListener("remote-pause", () => {
        console.log('Event.RemotePause');
        TrackPlayer.pause();
      });
    
      TrackPlayer.addEventListener("remote-play", () => {
        console.log('Event.RemotePlay');
        TrackPlayer.play();
      });

      TrackPlayer.addEventListener("remote-next", () => {
        console.log('Event.RemoteNext');
        TrackPlayer.skipToNext();
      });

      TrackPlayer.addEventListener("remote-previous", () => {
        console.log('Event.RemotePrevious');
        TrackPlayer.skipToPrevious();
      });

      // TrackPlayer.addEventListener(Event.RemotePause, () => {
      //   console.log('Event.RemotePause');
      //   TrackPlayer.pause();
      // });
    
      // TrackPlayer.addEventListener(Event.RemotePlay, () => {
      //   console.log('Event.RemotePlay');
      //   TrackPlayer.play();
      // });
    
      // TrackPlayer.addEventListener(Event.RemoteNext, () => {
      //   console.log('Event.RemoteNext');
      //   TrackPlayer.skipToNext();
      // });
    
      // TrackPlayer.addEventListener(Event.RemotePrevious, () => {
      //   console.log('Event.RemotePrevious');
      //   TrackPlayer.skipToPrevious();
      // });

      TrackPlayer.addEventListener("remote-stop", () => {
        TrackPlayer.destroy();
    });
// The player is ready to be used
    // This service needs to be registered for the module to work
    // but it will be used later in the "Receiving Events" section
}