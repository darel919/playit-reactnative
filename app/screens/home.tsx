import React from 'react'
import { View, TouchableOpacity, Pressable,  } from 'react-native'
import {useSelector} from 'react-redux'
import Playlist from '../components/playlist'
import MiniAudio from '../components/miniAudio'
import Audio from '../components/engine/audio'

export default function HomeScreen({navigation}) {
  const playingId = useSelector(state=> state.radioPlaying.id);
    return (
      <View>
        <Playlist/>
        <Audio/>

        {playingId ? 
        <Pressable onPress={() => navigation.navigate('NowPlayingScreen')}>
          <MiniAudio />
        </Pressable> 
        : null}
      </View>
    )
}