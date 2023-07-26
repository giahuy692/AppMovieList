import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MovieDetail from './Pages/MovieDetail'
import MovieDisplay from './Pages/MovieDisplay'
import Grit from './Pages/Grit'
import Login from './Pages/Login'
import Register from './Pages/Register'


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        <Stack.Screen name='Movie Explorer' component={MovieDisplay}/>
        <Stack.Screen name='Movie Detail' component= {MovieDetail } />
        <Stack.Screen name='Grit' component= {Grit} />
        <Stack.Screen name='Login' component= {Login}/>
        <Stack.Screen name='Register' component= {Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App