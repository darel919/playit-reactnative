import React, {useEffect} from 'react'
import { View, Pressable } from 'react-native'
import {useSelector} from 'react-redux'
import Playlist from '../components/playlist'
import Favorites from '../components/favorites'

import MiniAudio from '../components/miniAudio'
import AudioElapsed from '../components/engine/audioElapsed'

import {stylesTheme} from '../components/styling/userScheme'
import UserTheme from '../components/styling/userTheme'

import { getDBConnection, getDbItems } from '../components/db-service'

export default function HomeScreen({navigation}) {

  const theme = useSelector(state => state.mode);
  const radioPlayingState = useSelector(state=> state.radioPlaying);
  const playingId = radioPlayingState.id
  const playerState = useSelector(state => state.playerStatus);
  const radioLib = useSelector(state=>state.radioLibrary)

  // useEffect(async () => {
  //   const db = await getDBConnection();
  //   console.log(await getDbItems(db))
  // }, [])
    
  return (
    <View style={theme === 'dark' ? stylesTheme().userDark : stylesTheme().userWhite}>
      {/* <Favorites/> */}
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