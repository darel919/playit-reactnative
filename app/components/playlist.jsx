import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {requestId, fetchedRadioLibrary} from '../redux/store'
import {API_ENDPOINT} from "@env"
import {stylesTheme} from './styling/userScheme'
import Loading from '../screens/loading'

export default function Playlist() {
  const [isLoading, setIsLoading] = useState(true)
  const theme = useSelector(state => state.mode);
  useEffect(() => {

    fetch(API_ENDPOINT)
    .then((r) => r.json())
    .then((data) => {
      dispatch(fetchedRadioLibrary(data))
      setIsLoading(false)
    }
    
    )}, [])

  const dispatch = useDispatch();
  
  function pressHandler(item) {
    dispatch(requestId(item.id))
  }
  const data = useSelector(state=>state.radioLibrary)
    return (
        <SafeAreaView style={styles.home}>
            {isLoading && data.length === 0 ? 
            <Loading/>
            :
            <FlatList 
            data={data}
            showsHorizontalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            renderItem={({item}) => (
                <View>
                  <TouchableOpacity style={styles.picker} onPress={() => pressHandler(item)}>
                    <Image source={{uri: item.img}} style={styles.image}/>
                    <Text style={[styles.text, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  home: {
    paddingTop: 50,
  },
  loading: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginLeft: 3,
    fontFamily: 'SF-Pro-Bold',
  },
  picker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
      width: 100,
      height: 100,
      borderRadius: 10,
      borderWidth: 2,
      margin: 15,
      objectFit: 'contain'
  }
});