import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import {useSelector} from 'react-redux'
import Playlist from '../components/playlist'
import MiniAudio from '../components/miniAudio'

export default function HomeScreen({navigation}) {
  const playingId = useSelector(state=> state.radioPlaying.id);
    return (
      <View>
        <Playlist/>
        {playingId ? 
        
        <TouchableOpacity onPress={() => navigation.navigate('NowPlayingScreen')}>
          <MiniAudio />
        </TouchableOpacity> 
        : 
        null}
      </View>
    )
}