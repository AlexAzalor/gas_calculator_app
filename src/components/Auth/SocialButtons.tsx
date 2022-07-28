import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../CustomButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const SocialButtons = () => {
  const onSignInFacebook = () => {
    console.log('Facebook');
  }
  const onSignInGoogle = () => {
    console.log('Google');
  }
  const onSignInApple = () => {
    console.log('Apple');
  }

  return (
    <>
      <View style={styles.social}>
        <FontAwesome.Button name="facebook" onPress={onSignInFacebook} color="#4765a9" backgroundColor="#e7eaf4">
          Login with Facebook
        </FontAwesome.Button>
      </View>

      <View style={styles.social}>
        <FontAwesome.Button name="google" onPress={onSignInGoogle} color="#dd4d44" backgroundColor="#fae9ea">
          Login with Google
        </FontAwesome.Button>
      </View>

      <View style={styles.social}>
        <FontAwesome.Button name="apple" onPress={onSignInApple} color="#363636" backgroundColor="#e3e3e3">
          Login with Apple
        </FontAwesome.Button>
      </View>


      {/* <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#e7eaf4"
        fgColor="#4765a9"
      /> */}
      {/* <CustomButton
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
      /> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
  social: {
    marginBottom: 10,
    // alignItems: 'center',
    textAlign: 'center'
  },
  // google: {
  //   width: 300,
  //   paddingVertical: 10,
  //   marginBottom: 10,
  //   backgroundColor: '#fae9ea',
  //   alignItems: 'center'
  // },
  // text: {
  //   paddingLeft: 10,
  //   fontSize: 18,
  //   color: '#dd4d44',
  //   marginHorizontal: 10
  // }
})
