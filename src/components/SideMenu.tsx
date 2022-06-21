import { createDrawerNavigator } from "@react-navigation/drawer";
import { Calculator } from "./Calculator";
import { Map } from "./Map";

const Drawer = createDrawerNavigator();

export const SideMenu = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
    // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Map" component={Map} />
      <Drawer.Screen name="Gas calculator" component={Calculator} />
    </Drawer.Navigator>
  );
}
