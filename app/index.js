import React from "react";
import "./utils/gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Machine from "./screens/MachineScreen";
import HomeScreen from "./screens/HomeScreen";

const Drawer = createDrawerNavigator();

const Index = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Machine" component={Machine} />
    </Drawer.Navigator>
  );
};

export default Index;
