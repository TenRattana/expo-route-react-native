import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, FlatList } from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckBoxComponent = ({ title, content, keyCheck, data, updateList }) => {
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
    const newData = [...data];

    const subdetailIndex = newData[index].Subdetail.findIndex(
      (item) => item.Id_Inspection_Order === id
    );

    if (subdetailIndex !== -1) {
      newData[index].Subdetail[subdetailIndex] = {
        ...newData[index].Subdetail[subdetailIndex],
        Value_Check_Box: newValue ? 1 : 0,
      };
    }

    updateList(newData);
  };

  return (
    <View>
      <Text style={styles.textContent}>{title}</Text>

      <FlatList
        data={content}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contarinerList}>
            <Checkbox
              style={styles.checkbox}
              value={Boolean(item.Value_Check_Box)}
              onValueChange={(newValue) =>
                updateCheckbox(newValue, item.Id_Inspection_Order, keyCheck)
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
