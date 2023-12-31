import React, {useEffect, useState} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {remoteCmd} from '../redux/store'
import Icon from 'react-native-vector-icons/Ionicons';
import {stylesTheme} from '../components/styling/userScheme'
import { getDBConnection, setFavoriteToDb, favCheck, unfavoriteDb } from '../components/db-service'

export default function NowPlaying({navigation}) {

  const AlbumArt = useSelector(state=> state.infoFromAPI.img);
  const radioArt = useSelector(state=> state.radioPlaying.artwork);
  const radio = useSelector(state=> state.radioPlaying.title);
  const id = useSelector (state=>state.radioPlaying.id);
  const title = useSelector(state=> state.infoFromAPI.title) ;
  const elapsed = useSelector(state => state.playerElapsed);
  const playerStatus = useSelector (state=>state.playerStatus);
  const theme = useSelector(state => state.mode);
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(false)

  function pressHandler(func) {
    dispatch(remoteCmd(func))
  }

  useEffect(() => {
    setIsFavorite(false)
    getFav()
}, [id])

  const getFav = async () => {
      try {
        const db = await getDBConnection();
        const fCheck = await favCheck(db, id)
        if(fCheck === id) {
          setIsFavorite(true)
        }
      }
      catch {
        setIsFavorite(false)
      }
  }

  const saveFav = async () => {
    try {
      const item = {
        id: id,
        title: radio
      }
      const db = await getDBConnection();
      await setFavoriteToDb(db, item);
      setIsFavorite(true)
      ToastAndroid.show(radio+ ' added to Favorites', ToastAndroid.SHORT);
      
    } catch (error) {
      console.error(error);
    }
  }

  const unFav = async () => {
    try {
      const db = await getDBConnection();
      await unfavoriteDb(db, id)
      setIsFavorite(false)
      ToastAndroid.show(radio+ ' removed from Favorites', ToastAndroid.SHORT);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(()=> {
    if(!radioArt) {
      navigation.navigate('Home')
    }
  }, [radioArt])

    return (
      <View style={[styles.parent, theme === 'dark' ? stylesTheme().userDark : stylesTheme().userWhite]}>
        
        {/* Now Playing Album Art */}
        <View style={styles.page}>
          {AlbumArt ? <Image source={{uri: AlbumArt}} style={styles.image}/> : <Image source={{uri: radioArt}} style={styles.image}/> }
        
        </View>
        
        <View>

          {/* Now Playing Information */}
          <View style={styles.data}>
            {title ? <Text style={[styles.titleText, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{title}</Text> : <Text style={[styles.radioNameOnly]}>{radio}</Text>}
            {title ? <Text style={[styles.radioName, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{radio}</Text> : null}
            {elapsed === '00:00:00' 
              ? 
              <Text style={[styles.elapsed, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>Loading...</Text> 
              : 
              <View>
                {playerStatus === 'playing' 
                  ? 
                  <Text style={[styles.elapsed, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{elapsed}</Text> 
                  : 
                  <Text style={[styles.elapsed, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{playerStatus}</Text>
                }
              </View>
              }
          </View>

          {/* Controls */}
          <View style={styles.controls}>

            {/* Playback History */}
            <TouchableOpacity onPress={() => navigation.navigate('PlaybackHistoryScreen')}>
              <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="receipt-outline" size={30}></Icon>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => pressHandler('prev')}>
              <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="play-skip-back-outline" size={30}></Icon>
            </TouchableOpacity>
            {/* Play/Pause Controls */}
            {playerStatus === 'playing' ? 
            <TouchableOpacity onPress={() => pressHandler('pause')}>
              <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="pause" size={30}></Icon>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={() => pressHandler('play')}>
              <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="play" size={30}></Icon>
            </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => pressHandler('next')}>
              <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="play-skip-forward-outline" size={30}></Icon>
            </TouchableOpacity>

            {isFavorite ?
            <TouchableOpacity onPress={() => unFav()}>
              <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="star" size={30}></Icon>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={() => saveFav()}>
              <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="star-outline" size={30}></Icon>
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
    alignItems: 'center',
    width: '100%',
  },
  data: {
    textAlign: 'center',
    marginBottom: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  titleText: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 24,
    overflow: 'hidden',
    
  },
  radioName: {
      fontFamily: 'SF-Pro-Bold',
      fontSize: 17,
      width: '100%',
      textAlign: 'left',
  },
  radioNameOnly: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 28,
    width: '100%',
    textAlign: 'left',
    paddingBottom: 10
},
  elapsed: {
    fontFamily: 'SF-Pro-Bold',
    fontSize: 15
},
  image: {

      width: 270,
      height: 270,

      borderWidth: 2,
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 6,
      objectFit: 'contain',
  }
});
