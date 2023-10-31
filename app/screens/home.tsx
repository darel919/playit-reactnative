import React from 'react'
import { View, TouchableOpacity, Pressable,  } from 'react-native'
import {useSelector} from 'react-redux'
import Playlist from '../components/playlist'
import MiniAudio from '../components/miniAudio'

export default function HomeScreen({navigation}) {
  const playingId = useSelector(state=> state.radioPlaying.id);
    return (
      <View>
        <Playlist/>
        {playingId ? 
        
        <Pressable onPress={() => navigation.navigate('NowPlayingScreen')}>
          <MiniAudio />
        </Pressable> 
        : 
        null}
      </View>
    )
}