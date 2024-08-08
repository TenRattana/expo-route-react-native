import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextInputComponent = ({ data, updateText }) => {
  const { item, index, list } = data;
  const { Name_Checking_Process } = item;
  
  const [styles, setStyles] = useState({});
  const [input, setInput] = useState();

  useEffect(() => {
    updateText(input, index);
  }, [input]);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        setStyles(JSON.parse(await AsyncStorage.getItem("text_input")));
      } catch (error) {
        console.error("Error fetching styles from AsyncStorage:", error);
      }
    };

    fetchStyles();
  }, []);

  return (
    <View>
      <Text style={styles.textContent}>{Name_Checking_Process}</Text>

      <TextInput
        style={styles.inputText}
        onChangeText={setInput}
        value={input}
      />
    </View>
  );
};

export default TextInputComponent;
