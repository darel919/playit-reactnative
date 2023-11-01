import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Pressable } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {requestId} from '../redux/store'
import Icon from 'react-native-vector-icons/Ionicons';
import MiniAudio from '../components/miniAudio'
import {API_ENDPOINT} from '@env'
import {stylesTheme} from '../components/styling/userScheme'

export default function Search({navigation}) {
    const theme = useSelector(state => state.mode);
    const playingId = useSelector(state=> state.radioPlaying.id);
    const [text, setText] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        if(text) {
        fetch(API_ENDPOINT+'?search='+text, {method: "POST"})
        .then((r) => r.json())
        .then((data) => {
          setData(data)
        })
        }
      }, [text]) 
    
    const dispatch = useDispatch();
    function pressHandler(item) {
      dispatch(requestId(item.id))
    }

    return (
        <View style={styles.parentView}>
            <View style={[styles.textInput, theme === 'dark' ? stylesTheme().taskbarDark : stylesTheme().inputTextDark]}>
              <Icon name="search" size={20}/>
              <TextInput
              placeholder="Search for Radios"
              autoFocus
              onChangeText={text => setText(text)}
              value={text}
              style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark}
              />
            </View>

            {text && data.count > 0 ? <Text style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark}>Found {data.count} radios</Text> : null}
            {text ? <FlatList 
            data={data.rows}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <View>
                  <TouchableOpacity style={styles.picker} onPress={() => pressHandler(item)}>
                    <Image source={{uri: item.img}} style={styles.image}/>
                    <Text style={[styles.text, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />: null}

          {playingId > 0 ? 
          <Pressable style={styles.maudio} onPress={() => navigation.navigate('NowPlayingScreen')}>
            <MiniAudio/>
          </Pressable> 
          : null}

        </View>
    )
}
const styles = StyleSheet.create({
  parentView: {
    paddingLeft: 10,
    width: '100%',
    height: '100%'
  },
  maudio: {
    position: 'absolute',
    left:0,
    right:0,
    bottom:0,
  },
    text: {
      fontSize: 20,
      marginLeft: 3,
      fontFamily: 'SF-Pro-Bold',
    },
    textInput: {
      marginTop: 15,
      marginRight: 15,
      marginBottom: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      backgroundColor: '#dddddd',
      borderRadius: 10
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
    },
    mAudio: {
      margin: 10,
      bottom: 0,
      left:0,
      right:0,
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'lightgray',
      width: '95%',
      padding: 7,
      borderRadius: 10
    }
  });