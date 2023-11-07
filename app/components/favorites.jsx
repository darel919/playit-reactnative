import { useEffect, useState, useCallback } from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import { getDBConnection, getDbItems, unfavoriteDb } from '../components/db-service'
import {useDispatch, useSelector} from 'react-redux'
import {stylesTheme} from './styling/userScheme'
export default function FavoriteComponent() {
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

useEffect(() => {
    loadDataCallback()
}, [loadDataCallback])

async function pressHandler(item) {
    // console.log(item)
    const db = await getDBConnection();
    unfavoriteDb(db, item.id)
}

    return (
        <View>
            {dbData.length > 0 ? 
                    <View style={styles.home}>
                    <Text>
                        Favorites
                    </Text>
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
            : null
        }
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
      marginTop: 50,
      marginLeft: 12
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