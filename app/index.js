import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [themes, setThemes] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setList(data || []);

      try {
        const storedStyles = await AsyncStorage.getItem("themeSettings");
        if (storedStyles) setThemes(JSON.parse(storedStyles));
      } catch (error) {
        console.error("Error fetching styles from AsyncStorage:", error);
      }
    };

    getData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: themes.colors ? themes.colors.background : "#fff",
      flex: 1,
      padding: themes.spacing ? themes.spacing.medium : 16,
    },
    textContent: {
      fontSize: themes.fontSizes ? themes.fontSizes.extraLarge : 24,
      alignSelf: "center",
      margin: themes.spacing ? themes.spacing.small : 8,
    },
    buttonSubmit: {
      marginTop: 40,
      width: "50%",
      height: 40,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      elevation: 3,
      backgroundColor: themes.colors ? themes.colors.dark : "#000",
    },
    fixToText: {
      color: themes.colors ? themes.colors.surface : "#fff",
      fontSize: themes.fontSizes ? themes.fontSizes.medium : 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textContent}>KFM ตารางตรวจเช็คเครื่องจักร </Text>
      <FlatList
        data={list}
        keyExtractor={(item) => item.MachineID.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.MachineID}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Index;
