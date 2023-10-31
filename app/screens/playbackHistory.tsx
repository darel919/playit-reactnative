import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, FlatList, Button } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import React, { useState, useEffect } from 'react';
import MiniAudio from '../components/miniAudio'

export default function PlaybackHistory({navigation}) {
    const [reversed, setReversed] = useState(true)
    const fetchedData = useSelector(state => state.listenedSong)
    const [data, setData] = useState([])
    
    useEffect(() => {
      if (reversed) {
          let newArray = [...fetchedData]
          newArray.reverse()
          setData(newArray)
      } else {
        setData(fetchedData)
      }
    }, [fetchedData]) 

    useEffect(() => {
      if (reversed) {
          let newArray = [...fetchedData]
          newArray.reverse()
          setData(newArray)
      } else {
        setData(fetchedData)
      }
    }, [reversed]) 
    
    const dispatch = useDispatch();
    function pressHandler(item) {
        // dispatch(playRadio(item))
        // navigation.navigate('Home')
    }

    function reverseOrder() {
      setReversed(!reversed)
    }
    
    return (
      <View style={styles.parentView}>
        {data.length > 0 ? 
        <View>
          {reversed ? 
          <Button title="Sort by: Newest" onPress={() => reverseOrder()}></Button> 
          : 
          <Button title="Sort by: Oldest" onPress={() => reverseOrder()}></Button> 
          }
          <FlatList 
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.picker} onPress={() => pressHandler(item)}>
              <Image source={{uri: item.img}} style={styles.image}/>
              <View style={styles.textParent}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.artistText}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
            )}
        /> 
        </View>
        :
        <Text style={styles.noData}>No recorded radio data for the current session.</Text>
        }
      
        <Pressable style={styles.maudio} onPress={() => navigation.navigate('NowPlayingScreen')}>
          <MiniAudio/>
        </Pressable> 

      </View>
    )
}
const styles = StyleSheet.create({
    parentView: {
      width: '100%',
      height: '100%'
    },
    noData: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 15,
    },
    textParent: {
      marginLeft: 3,
      
    },
    text: {
      fontFamily: 'SF-Pro-Bold',
      overflow: 'hidden',
      width: '99%'
    },
    picker: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    image: {
        width: 88,
        height: 88,
        borderRadius: 10,
        
        margin: 10,
        objectFit: 'contain'
    },
    maudio: {
      position: 'absolute',
      left:0,
      right:0,
      bottom:0,
    }
  });