import { View, Text } from 'react-native'
import * as React from 'react'
import Login from './screens/Login'
import Signup from './screens/Signup'
import SaveCarScreen from './screens/SaveCarScreen'
import LoadCars from './screens/LoadCars'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigationScreen from './components/BottomNavigationScreen'
import UpdateCar from './screens/UpdateCar'

import { LogBox } from 'react-native';

 
// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
 
//Ignore all log notifications
LogBox.ignoreAllLogs();


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}} />
        <Stack.Screen name='signup' component={Signup} options={{headerShown:false}} />
        <Stack.Screen name='Dash' component={BottomNavigationScreen} options={{headerShown:false}} />
        <Stack.Screen name='update' component={UpdateCar} options={{title:'Update'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// screenOptions={{
//   headerShown:false
// }}