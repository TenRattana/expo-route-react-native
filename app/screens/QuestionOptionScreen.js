import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components/index";
import validator from "validator";

const QuestionOptionScreen = () => {
  const [list, setList] = useState([]);
  const [formState, setFormState] = useState({
    questionOption: "",
  });
  const [error, setError] = useState({
    questionOption: "",
  });

  useEffect(() => {
    const getQuestionOptions = async () => {
      try {
        const response = await axios.post("GetQuestionOptions");
        setList(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getQuestionOptions();
  }, []);

  const handleInputChange = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "questionOption") {
      if (validator.isEmpty(value.trim())) {
        errorMessage = "The Question Option Name field is required.";
      }
    }

    setError((prevError) => ({
      ...prevError,
      [fieldName]: errorMessage,
    }));

    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const showCreateButton = () => {
    return formState.questionOption.trim() !== "" && error.questionOption === "";
  };

  const insertData = async () => {
    const data = {
        OptionName: formState.questionOption,
    };

    try {
      await axios.post("InsertQuestionOption", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({ questionOption: "" });
      setError({ questionOption: "" });
      const response = await axios.post("GetQuestionOptions");
      setList(response.data || []);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const state = {
    tableHead: ["Question Option Name", "Edit", "Delete"],
    tableData: list.map((item) => [
        item.OptionName,
        item.OptionID,
        item.OptionID,
    ]),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Option</Card.Title>
          <Card.Divider />

          <Input
            placeholder="Enter Question Option Name"
            label="Question Option Name"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleInputChange("questionOption", text)}
            value={formState.questionOption}
          />
          {error.questionOption ? (
            <Text style={styles.errorText}>{error.questionOption}</Text>
          ) : null}

          <Button
            title="Create"
            type="outline"
            containerStyle={styles.containerButton}
            disabled={!showCreateButton()}
            onPress={insertData}
          />
        </Card>

        <Card>
          <Card.Title>List Option</Card.Title>
          <CustomTable
            Tabledata={state.tableData}
            Tablehead={state.tableHead}
            editIndex={1}
            delIndex={2}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    width: 200,
    marginVertical: 10,
    marginHorizontal: 50,
    alignSelf: "center",
  },
  containerInput: {
    backgroundColor: colors.dark,
  },
  errorText: {
    top: -12,
    marginLeft: spacing.sm,
    color: colors.error,
  },
});

export default QuestionOptionScreen;
