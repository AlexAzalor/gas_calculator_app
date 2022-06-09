import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface Props {
  placeholder: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
  inputValue: (e: string) => void;
}

export const InputAutocomplete: React.FC<Props> = ({ placeholder, onPlaceSelected, inputValue }) => {
  return (
    <>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ''}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
          inputValue(data.description)
        }}
        query={{
          key: 'AIzaSyBQU6MxUbfzyYDepaYzEdRoO_mhgUoD0b8',
          language: 'en',
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#888',
    borderWidth: 1,
    height: 32
  }
});
