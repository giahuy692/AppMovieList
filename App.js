import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MovieDetail from './Pages/MovieDetail'
import MovieDisplay from './Pages/MovieDisplay'
import TicketBookingScreen from './Pages/TicketBookingScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Movie Explorer">
        <Stack.Screen name='Movie Explorer' component={MovieDisplay}/>
        <Stack.Screen name='Movie Detail' component= {MovieDetail} />
        <Stack.Screen name='Ticket Booking' component= {TicketBookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App