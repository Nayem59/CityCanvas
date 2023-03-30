import React from 'react';
import AddArt from '../screens/AddArt';
import Profile from '../screens/Profile';
import Home from '../screens/Home';

import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeStack = ({ uid }) => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: '#C13584' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddArt"
        component={AddArt}
        options={{
          tabBarLabel: 'Add Art',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        // component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-person" size={size} color={color} />
          ),
        }}
      >
        {(props) => <Profile {...props} uid={uid} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomeStack;
