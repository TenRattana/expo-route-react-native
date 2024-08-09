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

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setList(data || []);
      setNameMachine(data[0]?.Name_Machine_Group || "Unknown");

      try {
        setStyles(JSON.parse(await AsyncStorage.getItem("index")));
      } catch (error) {
        console.error("Error fetching styles from AsyncStorage:", error);
      }
    };

    getData();
  }, []);

  const validation = (error) => {
    console.log(error);
  };

  const postData = async (datas) => {
    datas = datas.map((e) => ({
      Id_Checking_Process: e.Id_Checking_Process,
      Id_Inspection_Order: e.Id_Inspection_Order,
      Value: e.Value,
      Subdetail: e.Subdetail,
    }));
    
    let data = {
      Odata: datas
    };

    console.log(data.Odata[2]);
    
    // let config = {
    //   method: "post",
    //   url: "InsertFormMachine",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // try {
    //   const response = await axios.request(config);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHead}>KFM ตารางตรวจเช็คเครื่องจักร</Text>
      <Text style={styles.textHead}>รุ่น {nameMachine}</Text>

      <FlatList
        data={list}
        keyExtractor={(item) => item.Id_Checking_Process.toString()}
        renderItem={({ item, index }) => (
          <View key={index}>
            {item.Name_Field_Group === "TEXT_INPUT" ? (
              <TextInputComponent
                data={{ item, index, list }}
                updateText={setList}
                validation={validation}
              />
            ) : item.Name_Field_Group === "CHECK_BOX" ? (
              <CheckBoxComponent
                data={{ item, index, list }}
                updateList={setList}
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
