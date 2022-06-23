import React, { useRef, useState } from 'react';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Linking, Alert, Image } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { MapRoutSearchBox } from './MapRoutSearchBox';
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

const GOOGLE_MAPS_APIKEY = 'AIzaSyCCvs29b1B0jZ0unTzcTjOO7KmxmjF9Osk';

export const Map = () => {
  const [startPoint, setStartPoint] = useState<LatLng>();
  const [endPoint, setEndPoint] = useState<LatLng>();
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef<MapView>(null);

  // To make the camera show the entered place
  const moveCameraToEnteredPoint = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  }

  // set states with Redux
  const { getDistanceProp } = dataSlice.actions;
  const dispatch = useAppDispatch()

  // Get distance and duration value
  const traceRouteOnReady = (args: any) => {
    if (args) {
      setDistance(args.distance);
      dispatch(getDistanceProp(args.distance))
      setDuration(args.duration);
    }
  }

  // Viewing angle
  const edgePaddingValue = 75;
  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  }

  // To make the camera travel exactly in the center of the line after setting the route
  const traceRoute = () => {
    if (startPoint && endPoint) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([startPoint, endPoint], { edgePadding })
    }
  }

  // Set start point and end point to state
  const onPlaceSelected = (details: GooglePlaceDetail | null, flag: 'start' | 'end') => {
    const set = flag === 'start' ? setStartPoint : setEndPoint;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    }

    set(position);
    moveCameraToEnteredPoint(position);
  }

  // To open a set route in Google Maps (transition)
  const handleGoogleMapLink = () => {
    console.log('points --- ', startPoint?.latitude, startPoint?.longitude, endPoint?.latitude, endPoint?.longitude);

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
        {startPoint && (
          <Marker coordinate={startPoint}>
            <Image source={require('../../assets/icon-marker.png')} style={{ height: 32, width: 32 }} />
          </Marker>
        )}
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

