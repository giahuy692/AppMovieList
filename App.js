import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import MovieDetail from './Pages/MovieDetail'
import MovieDisplay from './Pages/MovieDisplay'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Showtimes from './Pages/Showtimes'
import TicketBookingScreen from './Pages/TicketBookingScreen'
import Payment from './Pages/Payment'
// import FileGet from './Pages/FileGet'
// import FileSave from './Pages/FileSave'


// import Datepicker from './Pages/datepicker'


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
<<<<<<< HEAD
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Movie Explorer'>
=======
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
>>>>>>> tai.nt.54909
        <Stack.Screen name='Movie Explorer' component={MovieDisplay}/>
        <Stack.Screen name='Movie Detail' component= {MovieDetail } />
        <Stack.Screen name='Showtimes' component= {Showtimes} />
        <Stack.Screen name='Login' component= {Login}/>
        <Stack.Screen name='Register' component= {Register} />
        <Stack.Screen name='TicketBooking' component= {TicketBookingScreen} />
        <Stack.Screen name='Payment' component= {Payment} />
        {/* <Stack.Screen name='FileGet' component= {FileGet} />
        <Stack.Screen name='FileSave' component= {FileSave} /> */}
        {/* <Stack.Screen name='Datepicker' component= {Datepicker}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App