import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';

type RootStackParamList = {
  HomeScreen: undefined;
  SignIn: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ConfirmEmailScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { control, handleSubmit } = useForm();

  const onConfirmPressed = (data: FieldValues) => {
    console.log('Confirm email - ', data);

    navigation.navigate('HomeScreen');
  }

  const onSignInPress = () => {
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
          name="code"
          placeholder="Enter your confirmation code"
          control={control}
          rules={{ required: 'Confirmaion code is required' }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

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
