import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckBoxComponent = ({ data, updateList }) => {
  const { item, index, list } = data;
  const { Subdetail, Name_Checking_Process } = item;
  const [themes, setThemes] = useState({});

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const storedStyles = await AsyncStorage.getItem("themeSettings");
        if (storedStyles) setThemes(JSON.parse(storedStyles));
      } catch (error) {
        console.error("Error fetching styles from AsyncStorage:", error);
      }
    };

    fetchStyles();
  }, []);

  const handleCheckBoxChange = (newValue, id) => {
    const newData = [...list];
    const subdetailIndex = newData[index].Subdetail.findIndex(
      (item) => item.Id_Inspection_Order === id
    );

    if (subdetailIndex !== -1) {
      newData[index].Subdetail[subdetailIndex].Value = newValue ? 1 : 0;
    }

    updateList(newData);
  };

  const styles = StyleSheet.create({
    textContent: {
      fontSize: themes.fontSizes ? themes.fontSizes.medium : 16,
      margin: themes.spacing ? themes.spacing.small : 8,
      marginLeft: 10,
    },
    containerList: {
      width: "90%",
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
    },
    checkbox: {
      width: 30,
      height: 30,
    },
    textCheckbox: {
      marginLeft: 8,
    },
  });

  return (
    <View>
      <Text style={styles.textContent}>{Name_Checking_Process}</Text>
      <FlatList
        data={Subdetail}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.containerList}>
            <Checkbox
              style={styles.checkbox}
              value={Boolean(item.Value)}
              onValueChange={(newValue) =>
                handleCheckBoxChange(newValue, item.Id_Inspection_Order)
              }
              color={item.Value ? "#4630EB" : undefined}
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
