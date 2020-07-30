import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Signup from '../screens/signup';
import Login from '../screens/login';
import ShoppingBuddy from '../screens/homePage';
import Logout from '../screens/logout'
import AddNewList from '../screens/addNewLists';
import ListPage from '../screens/listPage'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#008b8b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 30
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Shopping Buddy" 
       component={ShoppingBuddy} 
       options={
         { title: 'Shopping Buddy' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
       name="Profile" 
       component={Logout} 
       options={
         { title: 'Shopping Buddy' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
       name="AddNewList" 
       component={AddNewList} 
       options={
         { title: 'Add New List' } 
       }
      />
      <Stack.Screen 
       name="Items" 
       component={ListPage} 
       options={
         { title: 'Items' }
       }
      />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default MainStackNavigator