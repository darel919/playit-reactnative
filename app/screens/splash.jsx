import React, {useEffect} from 'react'
import { View, Text } from 'react-native'
import {PlaylistFetcher} from '../components/playlist'
export default function SplashScreen({navigation}) {

  useEffect(() => {
        navigation.navigate("HomeScreen")
  }, []) 
  
  return (
    <View>
        <PlaylistFetcher/>
        <Text>PlayIt</Text>
    </View>
  )
}