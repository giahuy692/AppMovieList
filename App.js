import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MovieDetail from './Pages/MovieDetail'
import MovieDisplay from './Pages/MovieDisplay'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Showtimes from './Pages/Showtimes'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Showtimes'>
        <Stack.Screen name='Movie Explorer' component={MovieDisplay}/>
        <Stack.Screen name='Movie Detail' component= {MovieDetail } />
        <Stack.Screen name='Showtimes' component= {Showtimes} />
        <Stack.Screen name='Login' component= {Login}/>
        <Stack.Screen name='Register' component= {Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App