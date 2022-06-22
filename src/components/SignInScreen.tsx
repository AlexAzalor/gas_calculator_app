import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View, useWindowDimensions, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Logo from '../../assets/square100.png';
import { instanceLogin } from '../api/auth/login';
import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';
import { SocialButtons } from './SocialButtons';
import expo from '../../app.json'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

type RootStackParamList = {
  HomeScreen: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { control, handleSubmit } = useForm();

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "339566261787-26jrgtic0lh0jlqh2md28hr70fr4c1f9.apps.googleusercontent.com",
    expoClientId: "339566261787-jp7vot14696cfuiqhjjsmdna93jo12gf.apps.googleusercontent.com"
  })

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    })
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name} </Text>
          <Text>{userInfo.email} </Text>
        </View>
      )
    }
  }

  const getRegisteredUser = async (data: FieldValues) => {
    const response = await instanceLogin(data.username, data.password).get('/api/login');

    if (response) {
      navigation.navigate('HomeScreen');
    }
  }

  const onSignInPressed = (data: FieldValues) => {
    console.log('Sign in input data - ', data);

    navigation.navigate('HomeScreen');
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  }

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <Text>App version: {expo.expo.version}</Text>
        <Text>Android app version: {expo.expo.android.versionCode}</Text>

        {showUserInfo()}

        <Button
          title={accessToken ? 'Get User Data' : 'Login'}
          onPress={accessToken ? getUserData : () => { promptAsync({ showInRecents: true }) }}
        />

        <CustomInput
          name="username"
          placeholder="Username1"
          control={control}
          rules={{ required: 'Username is required' }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long'
            }
          }}
          secureTextEntry
        />

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />
        <CustomButton
          text="Forgon password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialButtons />

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
