import React from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {remoteCmd} from '../redux/store'
import Icon from 'react-native-vector-icons/Ionicons';

export default function NowPlaying({navigation}) {

  const AlbumArt = useSelector(state=> state.infoFromAPI.img);
  const radioArt = useSelector(state=> state.radioPlaying.img);
  const radio = useSelector(state=> state.radioPlaying.title);
  const title = useSelector(state=> state.infoFromAPI.title) ;
  const elapsed = useSelector(state => state.playerElapsed);
  const playerStatus = useSelector (state=>state.playerStatus);

  const dispatch = useDispatch();

  function pressHandler(func: String) {
    dispatch(remoteCmd(func))
  }

    return (
      <View style={styles.parent}>
        
        {/* Now Playing Album Art */}
        <View style={styles.page}>
          {AlbumArt ? <Image source={{uri: AlbumArt}} style={styles.image}/> : <Image source={{uri: radioArt}} style={styles.image}/> }
        
        </View>
        
        <View>

          {/* Now Playing Information */}
          <View style={styles.data}>
            {title ? <Text style={styles.titleText}>{title}</Text> : <Text style={styles.radioNameOnly}>{radio}</Text>}
            {title ? <Text style={styles.radioName}>{radio}</Text> : null}
            {elapsed === '00:00:00' ? <Text style={styles.elapsed}>Loading...</Text> : <Text style={styles.elapsed}>{elapsed}</Text>}
          </View>

          {/* Controls */}
          <View style={styles.controls}>

            {/* Playback History */}
            <TouchableOpacity onPress={() => navigation.navigate('PlaybackHistoryScreen')}>
              <Icon name="receipt-outline" size={30}></Icon>
            </TouchableOpacity>

            {/* Play/Pause Controls */}
            {playerStatus === 'playing' ? 
            <TouchableOpacity onPress={() => pressHandler('pause')}>
              <Icon name="pause" size={30}></Icon>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={() => pressHandler('play')}>
              <Icon name="play" size={30}></Icon>
            </TouchableOpacity>
            }
          </View>
        </View>
        
      </View>
    )
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  page: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-around',
    width: '100%',
    // height: '100%',
  },
  data: {
    // width: '100%',
    textAlign: 'center',
    // marginLeft: 30,
    // marginRight: 30,
    marginBottom: 30,
    // backgroundColor: 'red',
    paddingLeft: 30,
    paddingRight: 30
  },
  titleText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 24,
    overflow: 'hidden',
    // width: '100%',
  },
  radioName: {
      fontFamily: 'SF-Pro-Bold',
      fontSize: 17,
      width: '100%',
      textAlign: 'left',
      // marginTop: -10,
      // marginBottom: 10
  },
  radioNameOnly: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 28,
    width: '100%',
    textAlign: 'left',
    paddingBottom: 10
},
  elapsed: {
    // fontWeight: 'bold',
    fontFamily: 'SF-Pro-Bold',
    fontSize: 15
},
  image: {
      // width: '80%',
      // height: 300,

      width: 270,
      height: 270,

      borderWidth: 2,
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 6,
      objectFit: 'contain',
  }
});
