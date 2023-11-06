import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import {useSelector} from 'react-redux'
import {stylesTheme} from '../components/styling/userScheme'

export default function LoadingScreen() {
  const theme = useSelector(state => state.mode);
  return (
    <View style={[styles.home, theme === 'dark' ? stylesTheme().userDark : stylesTheme().userWhite]}>
      <Text style={styles.text}>Loading content...</Text>
      <ActivityIndicator size="large" style={styles.loading}></ActivityIndicator>
      
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  },
  loading: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});