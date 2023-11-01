// Imported components
import {AppRegistry, useColorScheme, StyleSheet, Text} from 'react-native';
import {name as appName} from './app.json';
import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import storeState from './app/redux/store'
import { Provider } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import {PlaybackService} from './service'

// Components
import TrackPlayer from 'react-native-track-player';

// Pages
import Home from './app/screens/home'
import NowPlaying from './app/screens/nowPlaying'
import Search from './app/screens/search'
import PlaybackHistory from './app/screens/playbackHistory';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  const insets = useSafeAreaInsets();
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
      // height: 50,
      marginTop: -9,
      backgroundColor: '#000',
      paddingTop: 9,
      paddingBottom: 9,
    },
    tabWhite: {
      borderWidth: 0,
      // height: 50,
      marginTop: -9,
      backgroundColor: '#fff',
      paddingTop: 9,
      paddingBottom: insets.bottom,
    }
  })
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
function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeTabs} options={{ headerShown: false  }}/>
      <Stack.Screen name="NowPlayingScreen" component={NowPlaying} options={{headerTransparent: true, title: ''}}/>
      <Stack.Screen name="PlaybackHistoryScreen" component={PlaybackHistory} options={{title: 'Playback History'}}/>
    </Stack.Navigator>
  )
}
// RoutedApp
function App() {
const scheme = useColorScheme()
const linking = {
  prefixes: [
    'playit://', 'trackplayer://'
  ],
  config: {
    screens: {
      NowPlayingScreen: 'notification.click',
    },
  },
};

return (
  <Provider store={storeState}>
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppStack/>
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
  );
}
// Register TrackPlayer as Background Service
TrackPlayer.registerPlaybackService(() => PlaybackService);
// Register App
AppRegistry.registerComponent(appName, () => App);


