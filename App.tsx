import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Map } from './src/components/Map';
import { MapRoutSearchBox } from './src/components/MapRoutSearchBox';
import { Calculator } from './src/components/Calculator';

// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Map />
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Close drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </DrawerContentScrollView>
//   );
// }

const Drawer = createDrawerNavigator();

const SideMenu = () => {
  const [getDistance, setGetDistance] = useState(2)
  console.log('getDistance', getDistance);

  return (
    <Drawer.Navigator
      useLegacyImplementation
    // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Map">
        {() => (
          <Map getDistance={setGetDistance} />
        )}
      </Drawer.Screen>
      {/* <Drawer.Screen name="Test" component={MapRoutSearchBox} /> */}
      <Drawer.Screen name="Gas calculator">
        {() => (
          <Calculator x={getDistance} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SideMenu />
    </NavigationContainer>
  );
}
