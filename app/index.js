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

  const setTextInput = (newValue, keyIndex) => {
    const preResult = {
      Id_Checking_Process: keyIndex,
      value: newValue,
    };

    const newResult = result.map((item, index) => {
      item.Id_Checking_Process === keyIndex
        ? [...result, (result[index] = preResult)]
        : [...result, preResult];
    });

    // const updateText = result.map((item, i) => ({
    //   ...item,
    //   value:
    //     i.Id_Checking_Process === keyIndex
    //       ? preResult
    //       : (item.value = newValue),
    // }));

    setResult(newResult);

    console.log(result);

    // const index = list[keyIndex];

    // const preResult = {
    //   Id_Checking_Process: index.Id_Checking_Process,
    //   Examination_Result: v,
    // };

    // const t = [
    //   ...result,
    //   result.map((item) => ({
    //     item:
    //       item.Id_Checking_Process == preResult.Id_Checking_Process
    //         ? preResult
    //         : item,
    //   })),
    // ];

    // setResult(t);
    // console.log(result);
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
                data={{ item, index, list }}
                updateText={(newValue, keyIndex) =>
                  setTextInput(newValue, keyIndex)
                }
              />
            ) : item.Name_Field_Group === "CHECK_BOX" ? (
              <CheckBoxComponent
                data={{ item, index, list }}
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
