import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { InputAutocomplete } from './InputAutocomplete';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { dataSlice } from '../store/reducers/DataSlice';

interface Props {
  distance: number;
  duration: number;
  traceRoute: () => void;
  onPlaceSelected: (details: GooglePlaceDetail | null, flag: 'start' | 'end') => void;
}

export const MapRoutSearchBox: React.FC<Props> = ({ distance, duration, traceRoute, onPlaceSelected }) => {
  const [secondtCity, setSecondCity] = useState('')

  // set states with Redux
  const { getCityProp } = dataSlice.actions;
  const dispatch = useAppDispatch()

  const getCity = (place: string) => {
    const statusMap = new Map([
      [place.includes('Toronto'), 'Toronto'],
      [place.includes('Barrie'), 'Barrie'],
      [place.includes('Guelph'), 'Guelph'],
      [place.includes('Hamilton'), 'Hamilton'],
      [place.includes('Kitchener'), 'Kitchener'],
      [place.includes('Oshawa'), 'Oshawa'],
      [place.includes('Peterborough'), 'Peterborough'],
      [place.includes('Brantford'), 'Brantford'],
      [place.includes('United Kingdom'), 'United Kingdom'],
      [place.includes('UK'), 'UK'],
    ]);

    function getStatusByMap() {
      return statusMap.get(true) || 'Average';
    }
    dispatch(getCityProp(getStatusByMap()))
  }

  return (
    <View style={styles.searchBox}>
      <InputAutocomplete
        placeholder='Tap start point...'
        onPlaceSelected={(details) => { onPlaceSelected(details, 'start') }}
        inputValue={getCity}
      />
      <InputAutocomplete
        placeholder='Tap end point...'
        onPlaceSelected={(details) => { onPlaceSelected(details, 'end') }}
        inputValue={(e) => setSecondCity(e)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={traceRoute}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Set route</Text>
      </TouchableOpacity>
      {distance && duration ? (
        <View>
          <Text style={styles.value}>{distance.toFixed(1)} km</Text>
          <Text style={styles.value}>{Math.ceil(duration)} min</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  searchBox: {
    position: 'absolute',
    width: '80%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    // top: Constants.statusBarHeight,
    top: 0,
  },
  button: {
    backgroundColor: '#3237ff',
    width: 100,
    paddingVertical: 8,
    borderRadius: 4,
    position: 'relative',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  value: {
    alignSelf: 'center',
  }
});
