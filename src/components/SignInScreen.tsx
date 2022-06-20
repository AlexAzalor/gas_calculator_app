import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Logo from '../../assets/square100.png';
import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';

export const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { height } = useWindowDimensions();

  const onSignInPressed = () => {
    console.log('Sign in');
  }

  const onForgotPasswordPressed = () => {
    console.log('Forgot pass');
  }
  const onSignInFacebook = () => {
    console.log('Facebook');
  }
  const onSignInGoogle = () => {
    console.log('Google');
  }
  const onSignInApple = () => {
    console.log('Apple');
  }
  const onSignUpPress = () => {
    console.log('No acc');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButton text="Sign In" onPress={onSignInPressed} />
        <CustomButton
          text="Forgon password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="Sign In with Facebook"
          onPress={onSignInFacebook}
          bgColor="#e7eaf4"
          fgColor="#4765a9"
        />
        <CustomButton
          text="Sign In with Google"
          onPress={onSignInGoogle}
          bgColor="#fae9ea"
          fgColor="#dd4d44"
        />
        <CustomButton
          text="Sign In with Apple"
          onPress={onSignInApple}
          bgColor="#e3e3e3"
          fgColor="#363636"
        />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#e9edf0'
  },
  logo: {

  }
})
