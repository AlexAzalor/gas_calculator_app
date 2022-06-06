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
import { Provider } from 'react-redux';
import { setupStore } from './src/store/store';
// import { store } from './src/redux';

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
      <Drawer.Screen name="Map" component={Map} />
      {/* <Drawer.Screen name="Test" component={MapRoutSearchBox} /> */}
      <Drawer.Screen name="Gas calculator" component={Calculator} />
    </Drawer.Navigator>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <SideMenu />
//     </NavigationContainer>
//   );
// }

const store = setupStore();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SideMenu />
      </Provider>
    </NavigationContainer>
  );
}
