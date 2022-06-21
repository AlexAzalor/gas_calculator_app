import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
  control: Control<FieldValues, any>;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  rules: { [key: string]: any };
}

export const CustomInput: React.FC<Props> = ({ control, name, rules = {}, placeholder, secureTextEntry }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : '#e8e8e8' }]}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    paddingVertical: 10
  }
})
