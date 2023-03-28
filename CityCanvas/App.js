import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './nav/HomeStack';
import LoginStack from './nav/LoginStack';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import auth from '@react-native-firebase/auth';

export default function App() {
  const [initialising, setInitialising] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createNativeStackNavigator();

  const auth = getAuth();

  useEffect(() => {
    setInitialising(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setIsLoggedIn(true);
        setInitialising(false);
      } else {
        setIsLoggedIn(false);
        setInitialising(false);
      }
    });
  }, []);

  if (initialising) return null;

  return (
    <NavigationContainer>
      {isLoggedIn ? <HomeStack /> : <LoginStack />}
    </NavigationContainer>
  );
}
