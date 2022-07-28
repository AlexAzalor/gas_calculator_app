import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { ConfirmEmailScreen } from './Auth/ConfirmEmailScreen';
import { ForgotPasswordScreen } from './Auth/ForgotPasswordScreen';
import { HomeScreen } from './HomeScreen';
import { NewPasswordScreen } from './Auth/NewPasswordScreen';
import { SignInScreen } from './Auth/SignInScreen';
import { SignUpScreen } from './Auth/SignUpScreen';

// This is necessary for everything to work.
// expo install react-native-screens react-native-safe-area-context

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
