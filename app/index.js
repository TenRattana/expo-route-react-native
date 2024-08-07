import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "../config/axios";
import TextInputComponent from "./components/TextInputComponent";
import CheckBoxComponent from "./components/CheckBoxComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchData = async () => {
  try {
    const response = await axios.post("GetFormMachine", {
      machineQR: "SEPARATOR S.7",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};

const Index = () => {
  const [list, setList] = useState([]);
  const [nameMachine, setNameMachine] = useState("");
  const [styles, setStyles] = useState({});
  const [result, setResult] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setList(data);
      setNameMachine(data[0]?.Name_Machine_Group || "Unknown");
    };

    const fetchStyles = async () => {
      try {
        setStyles(JSON.parse(await AsyncStorage.getItem("index")));
      } catch (error) {
        console.error("Error fetching styles from AsyncStorage:", error);
      }
    };
    getData();
    fetchStyles();
  }, []);

  const setTextInput = (v, key) => {
    const index = list[key];

    setResult([
      ...result,
      result.map((item) => {
        item.Id_Checking_Process === index.Id_Checking_Process
          ? {
              value: v,
              Id_Checking_Process: index.Id_Checking_Process,
              Id_Machine_Group: index.Id_Machine_Group,
            }
          : result;
      }),
    ]);

    console.log(result);
  };

  const postData = async (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHead}>KFM ตารางตรวจเช็คเครื่องจักร</Text>
      <Text style={styles.textHead}>รุ่น {nameMachine}</Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.Id_Checking_Process}
        renderItem={({ item, index }) => (
          <View key={index}>
            {item.Name_Field_Group === "TEXT_INPUT" ? (
              <TextInputComponent
                content={item.Subdetail}
                title={item.Name_Checking_Process}
                keyCheck={index}
                data={list}
                updateText={(v, k) => setTextInput(v, k)}
              />
            ) : item.Name_Field_Group === "CHECK_BOX" ? (
              <CheckBoxComponent
                content={item.Subdetail}
                title={item.Name_Checking_Process}
                keyCheck={index}
                data={list}
                updateList={(newList) => setList(newList)}
              />
            ) : null}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={() => postData(list)}
      >
        <Text style={styles.fixToText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
