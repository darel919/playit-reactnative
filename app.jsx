// Imported components
import * as React from 'react';
import {useColorScheme, StyleSheet} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux'
import storeState from './app/redux/store'
import Icon from 'react-native-vector-icons/Ionicons';

// Components
import RemoteProcess from './app/components/engine/audioRemoteProcessor'
import Audio from './app/components/engine/audio'

// Pages
import Splash from './app/screens/splash'
import Home from './app/screens/home'
import Favorites from './app/screens/favorites'
import Loading from './app/screens/loading'
import NowPlaying from './app/screens/nowPlaying'
import Search from './app/screens/search'
import PlaybackHistory from './app/screens/playbackHistory';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs
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
          } else if (route.name === "Favorites") {
            icons = focused ? 'star' : 'star-sharp';
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
        <Tab.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites'  }}/> 
        <Tab.Screen name="Search" component={Search} options={{ title: 'Search'  }}/> 
      
    </Tab.Navigator>    
  )
  
}

// Navigation Stacks
function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={Splash} options={{ headerShown: false  }}/>
      <Stack.Screen name="HomeScreen" component={HomeTabs} options={{ headerShown: false  }}/>
      <Stack.Screen name="LoadScreen" component={Loading} options={{ headerShown: false  }}/>
      <Stack.Screen name="NowPlayingScreen" component={NowPlaying} options={{headerTransparent: true, title: ''}}/>
      <Stack.Screen name="PlaybackHistoryScreen" component={PlaybackHistory} options={{title: 'Playback History'}}/>
    </Stack.Navigator>
  )
}

// RoutedApp
export function App() {
  
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
    <RemoteProcess/>
    <Audio/>
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppStack/>
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
  );
}



