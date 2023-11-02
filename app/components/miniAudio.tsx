import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import {stylesTheme} from '../components/styling/userScheme'

export default function MiniAudio() {
    const img = useSelector(state=> state.radioPlaying.artwork);
    const title = useSelector(state=> state.radioPlaying.title);
    const elapsed = useSelector(state => state.playerElapsed);
    const APIready = useSelector(state => state.infoFromAPI);
    const playerStatus = useSelector (state=>state.playerStatus);
    const theme = useSelector(state => state.mode);
    
        return (
            <View style={[styles.smallView, theme === 'dark' ? stylesTheme().taskbarDark : stylesTheme().taskbarWhite]}>
                {APIready.title ? 
                <View style={[styles.parent]}>
                    <Image source={{uri: APIready.img}} style={styles.image}/>
                    <View style={styles.svData}>
                        <Text style={[styles.titleText, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{APIready.title}</Text>
                        <Text style={[styles.radioName, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{title}</Text>
                    </View>
                </View> 
                : 
                <View style={styles.parent}>
                    <Image source={{uri: img}} style={styles.image}/>
                    <View style={styles.svData}>
                        <Text style={[styles.titleText, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{title}</Text>
                        {elapsed === '00:00:00' && playerStatus === 'ready' ? 
                        null
                        : 
                        <Text style={[styles.radioName, theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark]}>{elapsed}</Text>}
                    </View>
                </View>
                }

                {playerStatus === 'playing' 
                ? 
                <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="pause" size={25}/> 
                : 
                <Icon style={theme === 'dark' ? stylesTheme().textWhite : stylesTheme().textDark} name="play" size={25}/>
                }
            </View>
        )
}

const styles = StyleSheet.create({
    parent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallView: {
        margin: 10,
        marginBottom: 8,
        bottom: 0,
        left:0,
        right:0,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        height: 58,
        // paddingTop: 7,
        paddingLeft: 7,
        paddingRight: 14,
        // paddingBottom: 8,
        borderRadius: 10
    },
    svData: {
        paddingLeft: 5,
        paddingRight: 5,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: -7,
        width: '75%',
    },
    titleText: {
        fontFamily: 'SF-Pro-Bold',
        overflow: 'hidden',
        height: 27
        // fontSize: 24,
    },
    radioName: {
        fontSize: 12,
        marginTop: -4
    },
    image: {
        width: 44,
        height: 44,
        borderWidth: 2,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 6,
    }
});
