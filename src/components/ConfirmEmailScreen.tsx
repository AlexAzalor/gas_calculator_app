import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';
import { SocialButtons } from './SocialButtons';

type RootStackParamList = {
  HomeScreen: undefined;
  SignIn: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ConfirmEmailScreen = () => {
  const [code, setCode] = useState('');

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const onConfirmPressed = () => {
    console.log('Confirm email');

    navigation.navigate('HomeScreen');
  }

  const onSignInPress = () => {
    console.log('No acc');

    navigation.navigate('SignIn');
  }

  const onResendPress = () => {
    console.log('Resend code');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          placeholder="Enter your confirmation code"
          value={code}
          setValue={setCode}
        />

        <CustomButton text="Confirm" onPress={onConfirmPressed} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign In"
          onPress={onSignInPress}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3237ff',
    margin: 10,
  },
  text: {
    color: 'grey',
    marginVertical: 10,
  },
  link: {
    color: '#fdb075',
    paddingHorizontal: 5
  },
})
