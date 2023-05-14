// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {firebase} from './config';
import Home from './cont/Home';
import Signup from './cont/Signup';
import Login from './cont/Login';
import Status from './cont/Status';
const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;

  if (!user) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Status" component={Status} />
    </Stack.Navigator>
  );
  // return (
  //   // <NavigationContainer>
  //   //   <Stack.Navigator screenOptions={{headerShown: false}}>
  //   //     <Stack.Screen name="Home" component={Home} />
  //   //     <Stack.Screen name="Signup" component={Signup} />
  //   //     <Stack.Screen name="Login" component={Login} />
  //   //     <Stack.Screen name="Status" component={Status} />
  //   //   </Stack.Navigator>
  //   // </NavigationContainer>
  // );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
// App;