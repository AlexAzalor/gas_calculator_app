import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
import { SignInScreen } from './src/components/SignInScreen';
import { SignUpScreen } from './src/components/SignUpScreen';
import { ConfirmEmailScreen } from './src/components/ConfirmEmailScreen';
import { ForgotPasswordScreen } from './src/components/ForgotPasswordScreen';
import { NewPasswordScreen } from './src/components/NewPasswordScreen';
import { Navigation } from './src/components/Navigation';
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

// All the logic related to configuring the store - including importing reducers, middleware, and enhancers - is handled in a dedicated file.
const store = setupStore();

export default function App() {
  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
      {/* <SideMenu /> */}
      {/* <SignInScreen /> */}
      {/* <SignUpScreen /> */}
      {/* <ConfirmEmailScreen /> */}
      {/* <ForgotPasswordScreen /> */}
      {/* <NewPasswordScreen /> */}
      <Navigation />
      {/* </NavigationContainer> */}
    </Provider>
  );
}
