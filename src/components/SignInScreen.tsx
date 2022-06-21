import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Logo from '../../assets/square100.png';
import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';
import { SocialButtons } from './SocialButtons';

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

        <CustomInput
          name="username"
          placeholder="Username"
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
