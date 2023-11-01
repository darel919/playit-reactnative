import React from 'react'
import { View, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import {useSelector} from 'react-redux'
import Playlist from '../components/playlist'

import MiniAudio from '../components/miniAudio'
import Audio from '../components/engine/audio'
import AudioElapsed from '../components/engine/audioElapsed'

import {stylesTheme} from '../components/styling/userScheme'
import UserTheme from '../components/styling/userTheme'

export default function HomeScreen({navigation}) {
  const theme = useSelector(state => state.mode);
  const playingId = useSelector(state=> state.radioPlaying.id);
  const playerState = useSelector(state => state.playerStatus);
  return (
    <View style={theme === 'dark' ? stylesTheme().userDark : stylesTheme().userWhite}>
      <Playlist/>
      <UserTheme/>
      <Audio/>
      {playerState === 'playing' ? <AudioElapsed/> : null}

      {playingId > 0? 
      <Pressable onPress={() => navigation.navigate('NowPlayingScreen')}>
        <MiniAudio />
      </Pressable> 
      : null}
    </View>
  )
}