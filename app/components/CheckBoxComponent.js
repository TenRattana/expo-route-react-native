import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckBoxComponent = ({ data, updateList }) => {
  const { item, index, list } = data;
  const { Subdetail, Name_Checking_Process } = item;
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        setStyles(JSON.parse(await AsyncStorage.getItem("check_box")));
      } catch (error) {
        console.error("Error fetching styles from AsyncStorage:", error);
      }
    };

    fetchStyles();
  }, []);

  const updateCheckbox = (newValue, id, index) => {
    const newData = [...list];

    const subdetailIndex = newData[index].Subdetail.findIndex(
      (item) => item.Id_Inspection_Order === id
    );

    if (subdetailIndex !== -1) {
      newData[index].Subdetail[subdetailIndex] = {
        ...newData[index].Subdetail[subdetailIndex],
        Value: newValue ? 1 : 0,
      };
    }

    updateList(newData);
  };

  return (
    <View>
      <Text style={styles.textContent}>{Name_Checking_Process}</Text>

      <FlatList
        data={Subdetail}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contarinerList}>
            <Checkbox
              style={styles.checkbox}
              value={Boolean(item.Value)}
              onValueChange={(newValue) =>
                updateCheckbox(newValue, item.Id_Inspection_Order, index)
              }
              color={item.value ? "#4630EB" : undefined}
            />
            <Text style={styles.textCheckbox}>
              {item.Name_Checking_Process}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.Id_Inspection_Order.toString()}
      />
    </View>
  );
};

export default CheckBoxComponent;
