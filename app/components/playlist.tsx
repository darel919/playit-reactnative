import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import {useDispatch} from 'react-redux'
import {playRadio} from '../redux/store'
import {API_ENDPOINT} from "@env"

export default function Playlist() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {

    fetch(API_ENDPOINT)
    .then((r) => r.json())
    .then((data) => {
      setData(data)
      setIsLoading(false)
    }
    )}, []) 
  const dispatch = useDispatch();

  function pressHandler(item) {
    dispatch(playRadio(item))
  }

    return (
        <SafeAreaView style={styles.home}>
            {isLoading ? 
            <ActivityIndicator size="large" style={styles.loading}></ActivityIndicator>
            :
            <FlatList 
            data={data}
            showsHorizontalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            renderItem={({item}) => (
                <View>
                  <TouchableOpacity style={styles.picker} onPress={() => pressHandler(item)}>
                    <Image source={{uri: item.img}} style={styles.image}/>
                    <Text style={styles.text}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />}
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