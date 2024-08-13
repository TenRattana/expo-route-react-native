import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
    textHeader: {
      fontSize: themes.fontSizes ? themes.fontSizes.extraLarge : 24,
      alignSelf: "center",
      margin: themes.spacing ? themes.spacing.small : 8,
    },
    textContent: {
      fontSize: themes.fontSizes ? themes.fontSizes.medium : 16,
      margin: themes.spacing ? themes.spacing.small : 8,
      marginTop: themes.spacing ? themes.spacing.large : 20,
      color: themes.colors ? themes.colors.text : "#000",
    },
    buttonTouche: {
      width: "30%",
      margin: themes.spacing ? themes.spacing.small : 8,
      height: 35,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: themes.colors ? themes.colors.dark : "#000",

      textInTouche: {
        fontSize: themes.fontSizes ? themes.fontSizes.medium : 16,
        color: themes.colors ? themes.colors.light : "#fff",
        alignSelf: "center",
        padding: themes.spacing ? themes.spacing.small : 8,
      },
    },
    
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>KFM ตารางตรวจเช็คเครื่องจักร </Text>
      <FlatList
        data={list}
        keyExtractor={(item) => item.MachineID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.buttonTouche}
            onPress={() =>
              navigation.navigate("DetailMachine", {
                machineId: item.MachineID,
              })
            }
          >
            <Text style={styles.buttonTouche.textInTouche}>{item.MachineName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Index;
