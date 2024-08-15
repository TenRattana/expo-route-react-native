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
import QuestionValidationScreen from "./screens/QuestionValidationScreen";
import QuestionOptionScreen from "./screens/QuestionOptionScreen";
import DropdownComponent from "./components/DropdownComponent";

const Drawer = createDrawerNavigator();

const Index = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Machine" component={Machine} />
      <Drawer.Screen name="Question" component={QuestionScreen} />
      <Drawer.Screen name="Question Option" component={QuestionOptionScreen} />
      <Drawer.Screen name="Detail Question" component={QuestionDetailScreen} />
      <Drawer.Screen name="Validation" component={QuestionValidationScreen} />
      <Drawer.Screen name="DropDown" component={DropdownComponent} />
    </Drawer.Navigator>
  );
};

export default Index;
