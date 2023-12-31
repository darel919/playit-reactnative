import React from 'react'
import { View, Pressable } from 'react-native'
import {useSelector} from 'react-redux'

import Playlist from '../components/playlist'
import MiniAudio from '../components/miniAudio'
import AudioElapsed from '../components/engine/audioElapsed'

import {stylesTheme} from '../components/styling/userScheme'
import UserTheme from '../components/styling/userTheme'

export default function HomeScreen({navigation}) {

  const theme = useSelector(state => state.mode);
  const radioPlayingState = useSelector(state=> state.radioPlaying);
  const playingId = radioPlayingState.id
  const playerState = useSelector(state => state.playerStatus);

  return (
    <View style={theme === 'dark' ? stylesTheme().userDark : stylesTheme().userWhite}>
      <Playlist/>
      <UserTheme/>
      {playerState === 'playing' ? <AudioElapsed/> : null}

      {playingId > 0? 
      <Pressable onPress={() => navigation.navigate('NowPlayingScreen')}>
        <MiniAudio />
      </Pressable> 
      : null}
    </View>
  )
}