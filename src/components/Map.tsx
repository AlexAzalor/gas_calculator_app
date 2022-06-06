import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import MapView, { Callout, Circle, LatLng, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, CameraRoll, TouchableOpacity } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { InputAutocomplete } from './InputAutocomplete';
import { MapRoutSearchBox } from './MapRoutSearchBox';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Calculator } from './Calculator';
import { useDispatch } from 'react-redux';
import { dataSlice } from '../store/reducers/DataSlice';
import { useAppDispatch } from '../hooks/redux';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 40.7767110,
  longitude: -73.979704,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyCCvs29b1B0jZ0unTzcTjOO7KmxmjF9Osk';

export const Map = () => {
  // console.log('-------itemId--------', itemId)
  // console.log(itemId)
  // const [pin, setPin] = useState({
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  // });

  const [startPoint, setStartPoint] = useState<LatLng>();
  const [endPoint, setEndPoint] = useState<LatLng>();
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef<MapView>(null);

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  }

  const edgePaddingValue = 75;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  }

  // set states with Redux
  const { getDistanceProp } = dataSlice.actions;
  const dispatch = useAppDispatch()

  const traceRouteOnReady = (args: any) => {
    if (args) {
      setDistance(args.distance);
      dispatch(getDistanceProp(args.distance))
      setDuration(args.duration);
    }
  }

  // so that when setting the route, the camera rises
  const traceRoute = () => {
    if (startPoint && endPoint) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([startPoint, endPoint], { edgePadding })
    }
  }

  const onPlaceSelected = (details: GooglePlaceDetail | null, flag: 'start' | 'end') => {
    const set = flag === 'start' ? setStartPoint : setEndPoint;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    }

    set(position);
    moveTo(position);
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_POSITION}
      >
        {startPoint && <Marker coordinate={startPoint}></Marker>}
        {endPoint && <Marker coordinate={endPoint}></Marker>}
        {showDirections && startPoint && endPoint && (
          <MapViewDirections
            origin={startPoint}
            destination={endPoint}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="#00b0ff"
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <MapRoutSearchBox
        distance={distance}
        duration={duration}
        traceRoute={traceRoute}
        onPlaceSelected={onPlaceSelected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginLeft: 10,
    // borderLeftWidth: 3
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
// Dimensions.get('window').height
{/* <Marker
          coordinate={startPoint}
          draggable={true}
          onDragStart={(e) => {
            console.log('Drag start', e.nativeEvent.coordinate)
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }}
        >
        </Marker> */}

