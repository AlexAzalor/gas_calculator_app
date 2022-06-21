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

export const NewPasswordScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { control, handleSubmit } = useForm();

  const onSubmitPressed = (data: FieldValues) => {
    console.log('Send new password - ', data);

    navigation.navigate('HomeScreen');
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="code"
          placeholder="Code"
          control={control}
          rules={{ required: 'Code is required' }}
        />

        <CustomInput
          name="newpassword"
          placeholder="Enter your new password"
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

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

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
