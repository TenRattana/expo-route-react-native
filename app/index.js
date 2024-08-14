if (__DEV__) {
  require("./debugging/ReactotronConfig");
}
import React from "react";
import "./utils/gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Machine from "./screens/MachineScreen";
import HomeScreen from "./screens/HomeScreen";
import QuestionScreen from "./screens/QuestionScreen";
import QuestionDetailScreen from "./screens/QuestionDetailScreen";

const Drawer = createDrawerNavigator();

const Index = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Machine" component={Machine} />
      <Drawer.Screen name="Question" component={QuestionScreen} />
      <Drawer.Screen name="Detail Question" component={QuestionDetailScreen} />
    </Drawer.Navigator>
  );
};

export default Index;
