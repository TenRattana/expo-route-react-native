import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import validator from "validator";

const TextInputComponent = ({ data, updateText }) => {
  const { item, index, list } = data;
  const { Name_Checking_Process, Value_Check_Box, Required } = item;

  const [input, setInput] = useState(Value_Check_Box);
  const [error, setError] = useState("");
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

  const styles = StyleSheet.create({
    textContent: {
      fontSize: themes.fontSizes ? themes.fontSizes.medium : 16,
      margin: themes.spacing ? themes.spacing.small : 8,
      marginLeft: 10,
    },
    inputText: {
      width: "90%",
      height: 50,
      borderRadius: 10,
      borderWidth: 0.5,
      alignSelf: "center",
      paddingLeft: themes.spacing ? themes.spacing.medium : 16,
      margin: themes.spacing ? themes.spacing.small : 8,
    },
    errorText: {
      color:themes.colors ? themes.colors.error : "red",
    }
  });

  return (
    <View>
      <Text style={styles.textContent}>{Name_Checking_Process}</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={handleInputChange}
        value={input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};
export default TextInputComponent;
