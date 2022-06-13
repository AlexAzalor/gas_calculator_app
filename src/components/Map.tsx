import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import MapView, { Callout, Circle, LatLng, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, CameraRoll, TouchableOpacity, Linking, Alert } from 'react-native';
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
const LATITUDE_DELTA = 0.07;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 43.65084753185803,
  longitude: -79.38226848764323,
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
  console.log('startPoint?.latitude', startPoint?.latitude, typeof (startPoint?.latitude));
  console.log('startPoint?.longitude', startPoint?.longitude);

  const [endPoint, setEndPoint] = useState<LatLng>();
  console.log('endPoint?.latitude', endPoint?.latitude);
  console.log('endPoint?.longitude', endPoint?.longitude, endPoint?.longitude.toFixed(7));

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

  const handleGoogleMapLink = () => {
    console.log('startPoint?.latitude --- ', startPoint?.latitude, startPoint?.longitude, endPoint?.latitude, endPoint?.longitude);

    if (startPoint?.latitude && endPoint?.latitude) {
      Linking.openURL(`https://www.google.com/maps/dir/${startPoint.latitude.toFixed(7)},${startPoint.longitude.toFixed(7)}/${endPoint.latitude.toFixed(7)},${endPoint.longitude.toFixed(7)}`);
    } else {
      Alert.alert('Please tap start point and end point.');
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={INITIAL_POSITION}
        toolbarEnabled={true}
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
      <Text style={{ color: 'blue' }}
        onPress={handleGoogleMapLink}>
        Go to Google map
      </Text>
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

        // <Marker
        //   coordinate={{
        //     latitude: 43.65126312685369,
        //     longitude: -79.38690724058443,
        //   }}
        //   draggable={true}
        //   onDragStart={(e) => {
        //     console.log('MArKer Drag start ------ ', e.nativeEvent.coordinate)
        //   }}
        //   onDragEnd={(e) => {
        //     setStartPoint({
        //       latitude: e.nativeEvent.coordinate.latitude,
        //       longitude: e.nativeEvent.coordinate.longitude,
        //     })
        //     console.log('MArKer Drag end ------- ', e.nativeEvent.coordinate)
        //   }}
        // >
        // </Marker>
        // <Marker
        //   coordinate={{
        //     latitude: 43.65176411329413,
        //     longitude: -79.38189029408626,
        //   }}
        //   draggable={true}
        //   onDragStart={(e) => {
        //     console.log('MArKer 2 start', e.nativeEvent.coordinate)
        //   }}
        //   onDragEnd={(e) => {
        //     setEndPoint({
        //       latitude: e.nativeEvent.coordinate.latitude,
        //       longitude: e.nativeEvent.coordinate.longitude,
        //     })
        //     console.log('MArKer 2 end', e.nativeEvent.coordinate)
        //   }}
        // >
        // </Marker>

