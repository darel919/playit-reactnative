// Imported components
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {remoteFunction} from './app/components/engine/audioRemoteProcessor'
import {App} from './app'

// Components
import TrackPlayer from 'react-native-track-player';

// Register TrackPlayer as Background Service
TrackPlayer.registerPlaybackService(() => remoteFunction);

// Register App
AppRegistry.registerComponent(appName, () => App);


