import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";

const MachineScreen = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("GetMachines");
        setList(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <View>
      <Text>{list.map((item) => item.MachineName)}</Text>
    </View>
  );
};

export default MachineScreen;

const styles = StyleSheet.create({});
