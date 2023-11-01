// Imported components
import {AppRegistry, Button, useColorScheme, StyleSheet} from 'react-native';
import {name as appName} from './app.json';
import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import storeState from './app/redux/store'
import { Provider } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import TrackPlayer from 'react-native-track-player';
import Audio from './app/components/engine/audio'
import rNR from './app/components/engine/radioNameReturn'

// Pages
import Home from './app/screens/home'
import NowPlaying from './app/screens/nowPlaying'
import Search from './app/screens/search'
import PlaybackHistory from './app/screens/playbackHistory';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ focused, color, size }) => {
          let icons;
          if (route.name === "Home") {
            icons = focused ? 'home' : 'home-outline';
          } else if (route.name === "Search") {
            icons = focused ? 'search' : 'search-sharp';
          }

          // // You can return any component that you like here!
          return <Icon name={icons} size={size} color={color} />
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarItemStyle: tabByUser()
      })}>

        <Tab.Screen name="Home" component={Home} options={({headerLargeTitle: true, headerTransparent: true})}/>
        <Tab.Screen name="Search" component={Search} options={{ title: 'Search'  }}/>
          
    </Tab.Navigator>  
       
  )
}

function tabByUser() {
  const scheme = useColorScheme()
  if (scheme === 'dark') {
    return styles.tabDark
  }
  else {
    return styles.tabWhite
  }
}
const styles = StyleSheet.create({
  tabDark: {
    borderWidth: 0,
    marginTop: -1,
    backgroundColor: '#000'
  },
  tabWhite: {
    borderWidth: 0,
    marginTop: -1,
    backgroundColor: '#fff'
  }
})
// RoutedApp
function App() {
const scheme = useColorScheme()
return (
  <Provider store={storeState}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeTabs} options={{ headerShown: false  }}/>
          <Stack.Screen name="NowPlayingScreen" component={NowPlaying} options={{headerTransparent: true, title: ''}}/>
          <Stack.Screen name="PlaybackHistoryScreen" component={PlaybackHistory} options={{title: 'Playback History'}}/>
        </Stack.Navigator>
        
      </NavigationContainer>
  </Provider>
  );
}

// Register TrackPlayer as Background Service
TrackPlayer.registerPlaybackService(() => require('./service'));
// Register App
AppRegistry.registerComponent(appName, () => App);


