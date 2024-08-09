import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import validator from "validator";

const TextInputComponent = ({ data, updateText , validation }) => {
  const { item, index, list } = data;
  const { Name_Checking_Process, Value_Check_Box , Required } = item;

  const [styles, setStyles] = useState({});
  const [input, setInput] = useState(Value_Check_Box);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const fetchedStyles = JSON.parse(await AsyncStorage.getItem("text_input"));
        setStyles(fetchedStyles || {});
      } catch (error) {
        console.error("Error fetching styles from AsyncStorage:", error);
      }
    };

    fetchStyles();
  }, []);

  const handleInputChange = (text) => {
    let errorMessage = "";

    if (validator.isEmpty(text.trim()) && Required) {
      errorMessage = `The ${Name_Checking_Process} field is required.`;
    } 

    setError(errorMessage);
    setInput(text);

    if (!errorMessage) {
      const updatedList = [...list];
      updatedList[index] = { ...updatedList[index], Value: text };
      updateText(updatedList);
    }
  };

  return (
    <View>
      <Text style={styles.textContent}>{Name_Checking_Process}</Text>
      <TextInput
        style={[styles.inputText, error ? styles.inputError : null]}
        onChangeText={handleInputChange}
        value={input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default TextInputComponent;
