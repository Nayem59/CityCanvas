import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('user signed in');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Wrong email or password');
      });
  };

  return (
    <SafeAreaView>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(input) => setEmail(input)}
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(input) => setPassword(input)}
        autoCapitalize="none"
        secureTextEntry
      ></TextInput>
      <TouchableOpacity onPress={signIn}>
        <Text>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Text>Sign up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
