import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';
import { SocialButtons } from './SocialButtons';

type RootStackParamList = {
  ConfirmEmail: undefined;
  SignIn: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const SignUpScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { control, handleSubmit, watch } = useForm();
  const password = watch('password');

  const onRegisterPressed = (data: FieldValues) => {
    console.log('Register input data - ', data);

    navigation.navigate('ConfirmEmail');
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  }

  const onTermsOfUsePressed = () => {
    console.log('Terms of use');
  }

  const onPocicyPressed = () => {
    Linking.openURL('https://www.privacypolicies.com/live/d3475ed6-81f3-475f-a31a-503e064de9bd');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Username should be at least 3 character long' },
            maxLength: { value: 24, message: 'Username should be max 24 character long' }
          }}
        />
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          keyboardType="email-address"
          rules={{
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email is invalid'
            }
          }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long'
            }
          }}
        />
        <CustomInput
          name="repeatpassword"
          placeholder="Repeat Password"
          control={control}
          secureTextEntry
          rules={{
            validate: (value: string) => value === password || 'Password do not match',
          }}
        />

        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '}
          <Text style={styles.link} onPress={onPocicyPressed}>Privacy Policy</Text>
        </Text>

        <SocialButtons />

        <CustomButton
          text="Have an account? Sign In"
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
