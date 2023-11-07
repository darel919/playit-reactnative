import { useEffect, useState, useCallback } from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable} from 'react-native'
import { getDBConnection, getDbItems, unfavoriteDb } from '../components/db-service'
import {useDispatch, useSelector} from 'react-redux'
import {stylesTheme} from '../components/styling/userScheme'
import MiniAudio from '../components/miniAudio'
import {requestId} from '../redux/store'

export default function FavoriteScreen({navigation}) {
    const [dbData, setDbData] = useState([])
    const theme = useSelector(state => state.mode);

const loadDataCallback = useCallback(async () => {
    try {
        const db = await getDBConnection();
        setDbData(await getDbItems(db))
    }
    catch {

    }
}) 

const dispatch = useDispatch()

useEffect(() => {
    loadDataCallback()
}, [loadDataCallback])

async function pressHandler(item) {
    dispatch(requestId(item.id))
}

const playingId = useSelector(state=> state.radioPlaying.id);

    return (
        <View style={styles.parentView}>
            {dbData.length > 0 ? 
                <View style={styles.home}>
                    <FlatList 
                    data={dbData}
                    showsHorizontalScrollIndicator={false}
                    contentInsetAdjustmentBehavior="automatic"
                    renderItem={({item}) => (
                        <View>
                        <TouchableOpacity style={styles.picker} onPress={() => pressHandler(item)}>
                            <Text style={[styles.text, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{item.radioName}</Text>
                        </TouchableOpacity>
                        </View>
                    )}
                    />
                </View>
                : 
                <Text style={styles.nothing}>Currently, you have no favorites station</Text>}
            {playingId > 0 ? 
                <Pressable style={styles.maudio} onPress={() => navigation.navigate('NowPlayingScreen')}>
                    <MiniAudio/>
                </Pressable> 
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
      marginLeft: 3,
    },
    nothing: {
        marginTop:25,
      width: '100%',
      textAlign: 'center'
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
    },
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
  });