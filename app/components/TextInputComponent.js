import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextInputComponent = ({ title, keyCheck, data , updateText}) => {
  const [styles, setStyles] = useState({});
  const [input, setInput] = useState();

  useEffect(() => {
    updateText(input , keyCheck)
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
      <Text style={styles.textContent}>{title}</Text>

      <TextInput
        style={styles.inputText}
        onChangeText={setInput}
        value={input}
      />
    </View>
  );
};

export default TextInputComponent;
