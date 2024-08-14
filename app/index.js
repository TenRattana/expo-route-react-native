import React, { useEffect, useState } from "react";
import "./utils/gesture-handler";
import { StyleSheet } from "react-native";
import { colors, spacing } from "../theme/index";
import axios from "../config/axios";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DetailMachine from "./screens/DetailMachineScreen"; 

const Drawer = createDrawerNavigator();

const fetchData = async () => {
  try {
    const response = await axios.post("GetMachines");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Index = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setList(data || []);
    };

    getData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
      padding: spacing.md,
    },
    textHeader: {
      fontSize: 24,
      alignSelf: "center",
      margin: spacing.xs,
    },
    textContent: {
      fontSize: 16,
      margin: spacing.xs,
      marginTop: spacing.xl,
      color: colors.text,
    },
    buttonTouche: {
      width: "30%",
      margin: spacing.xs,
      height: 35,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: colors.dark,
    },
    textInTouche: {
      fontSize: 16,
      color: colors.light,
      alignSelf: "center",
      padding: spacing.xs,
    },
  });

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DetailMachine" component={DetailMachine} />
    </Drawer.Navigator>
  );
};

export default Index;
