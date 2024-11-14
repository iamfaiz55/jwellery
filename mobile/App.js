import { Alert, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import {  PaperProvider } from 'react-native-paper';
import Login from './screen/Login';
import {Provider} from 'react-redux';
import Home_page from './screen/Home_page';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
import reduxStore from './redux/store';
import Otp from './screen/Otp';
// import Test from './screen/Test';



const Stack = createNativeStackNavigator();

export default function App() {


  const theme = {
    "colors": {
      "primary": "rgb(16, 109, 32)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(157, 248, 152)",
      "onPrimaryContainer": "rgb(0, 34, 4)",
      "secondary": "rgb(82, 99, 79)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(213, 232, 206)",
      "onSecondaryContainer": "rgb(17, 31, 15)",
      "tertiary": "rgb(56, 101, 106)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(188, 235, 240)",
      "onTertiaryContainer": "rgb(0, 32, 35)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(252, 253, 246)",
      "onBackground": "rgb(26, 28, 25)",
      "surface": "rgb(252, 253, 246)",
      "onSurface": "rgb(26, 28, 25)",
      "surfaceVariant": "rgb(222, 229, 216)",
      "onSurfaceVariant": "rgb(66, 73, 64)",
      "outline": "rgb(114, 121, 111)",
      "outlineVariant": "rgb(194, 201, 189)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(47, 49, 45)",
      "inverseOnSurface": "rgb(240, 241, 235)",
      "inversePrimary": "rgb(130, 219, 126)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(240, 246, 235)",
        "level2": "rgb(233, 242, 229)",
        "level3": "rgb(226, 237, 223)",
        "level4": "rgb(224, 236, 220)",
        "level5": "rgb(219, 233, 216)"
      },
      "surfaceDisabled": "rgba(26, 28, 25, 0.12)",
      "onSurfaceDisabled": "rgba(26, 28, 25, 0.38)",
      "backdrop": "rgba(44, 50, 42, 0.4)"
   }
 }

  return <PaperProvider theme={theme}>
    <Provider store={reduxStore}>
    
    <NavigationContainer>
    {/* <ScrollView> */}
   <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name='Home' options={{ headerShown: false }} component={Home_page}/>
    <Stack.Screen name='login' options={{ headerShown: false }} component={Login}/>
    <Stack.Screen name='otp' options={{ headerShown: false }} component={Otp}/>
    {/* <Stack.Screen name='test' options={{ headerShown: false }} component={Test}/> */}
    </Stack.Navigator>
    {/* </ScrollView> */}
    </NavigationContainer>
    </Provider>
  </PaperProvider>

}


