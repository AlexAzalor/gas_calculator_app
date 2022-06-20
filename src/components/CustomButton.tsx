import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
  type?: "PRIMARY" | "TERTIARY";
  bgColor?: string;
  fgColor?: string;
}

export const CustomButton: React.FC<Props> = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {}
      ]}

    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {}
        ]}
      >
        {text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#3237ff',
  },
  container_TERTIARY: {},
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  text_PRIMARY: {},
  text_TERTIARY: {
    color: 'grey',
  },
})
