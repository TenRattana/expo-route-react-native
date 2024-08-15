import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable, DropdownComponent } from "../components/index";
import validator from "validator";

const QuestionDetailScreen = () => {
  const [list, setList] = useState([]);
  const [question, setQuestion] = useState([]);
  const [option, setOption] = useState([]);
  const [formState, setFormState] = useState({
    qusetionId: "",
    optionID: "",
    optionValue: "",
    displayOrder: "",
    description: "",
  });
  const [error, setError] = useState({
    qusetionId: "",
    optionID: "",
    optionValue: "",
    displayOrder: "",
    description: "",
  });

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.post("GetQuestions");
        setQuestion(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getQuestionOptions = async () => {
      try {
        const response = await axios.post("GetQuestionOptions");
        setOption(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getQuestionDetail = async () => {
      try {
        const response = await axios.post("GetQuestionDetails");
        setList(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getQuestions();
    getQuestionOptions();
    getQuestionDetail();
  }, []);

  const handleInputChange = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "qusetionId") {
      if (validator.isEmpty(value.trim())) {
        errorMessage = "The Question field is required.";
      }
    } else if (fieldName === "optionID") {
      if (!validator.isNumeric(value.trim())) {
        errorMessage = "The Option field is Numeric.";
      }
    } else if (fieldName === "optionValue") {
      if (!validator.isNumeric(value.trim())) {
        errorMessage = "The Option Value field is Numeric.";
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
    return (
      formState.qusetionId.trim() !== "" &&
      formState.optionID.trim() !== "" &&
      formState.optionValue.trim() !== "" &&
      formState.displayOrder.trim() !== "" &&
      formState.description.trim() !== "" &&
      error.qusetionId !== "" &&
      error.optionID !== "" &&
      error.optionValue !== "" &&
      error.displayOrder !== "" &&
      error.description !== ""
    );
  };

  const insertData = async () => {
    const data = {
      QuestionID: formState.qusetionId,
      OptionID: formState.optionID,
      OptionValue: formState.optionValue,
      DisplayOrder: formState.displayOrder,
      Description: formState.description,
    };

    try {
      await axios.post("InsertQuestionDetail", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({
        qusetionId: "",
        optionID: "",
        optionValue: "",
        displayOrder: "",
        description: "",
      });
      setError({
        qusetionId: "",
        optionID: "",
        optionValue: "",
        displayOrder: "",
        description: "",
      });
      const response = await axios.post("GetQuestionDetails");
      setList(response.data || []);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const state = {
    tableHead: [
      "Question",
      "Option",
      "Value",
      "Description",
      "DisplayOrder",
      "Edit",
      "Delete",
    ],
    tableData: list.map((item) => [
      item.QuestionID,
      item.OptionID,
      item.OptionValue,
      item.Description,
      item.DisplayOrder,
      item.ID,
      item.ID,
    ]),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Question Detail</Card.Title>
          <Card.Divider />

          <DropdownComponent />
          {error.questionOption ? (
            <Text style={styles.errorText}>{error.questionOption}</Text>
          ) : null}
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
            editIndex={5}
            delIndex={6}
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

export default QuestionDetailScreen;
