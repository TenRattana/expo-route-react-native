import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components/index";
import validator from "validator";

const QuestionForm = () => {
  const [list, setList] = useState([]);
  const [type , setType] = useState([]);
  const [formState, setFormState] = useState({
    questionName: "",
    questionType: "",
    questionDataType: "",
    displayOrder: "",
  });

  const [error, setError] = useState({
    questionName: "",
    questionType: "",
    questionDataType: "",
    displayOrder: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("GetQuestions");
        setList(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getDataType = async () => {
        try {
          const response = await axios.post("GetQuestionTypes");
          setType(response.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    getData();
    getDataType();
  }, []);

  const handleInputChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const showCreateButton = () => {
    return (
      formState.questionName.trim() !== "" &&
      formState.questionType.trim() !== "" &&
      formState.questionDataType.trim() !== "" &&
      formState.displayOrder.trim() !== "" &&
      error.questionName === "" &&
      error.questionType === "" &&
      error.questionDataType === "" &&
      error.displayOrder === ""
    );
  };

  const insertData = async () => {
    const data = {
      questionName: formState.questionName,
      questionType: formState.questionType,
      questionDataType: formState.questionDataType,
      displayOrder: formState.displayOrder,
    };

    try {
      await axios.post("InsertQuestion", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({ machineName: "", displayOrder: "" });
      setError({ machineName: "", displayOrder: "" });
      const response = await axios.post("GetMachines");
      setList(response.data || []);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const state = {
    tableHead: [
      "Question Name",
      "Question Type",
      "Question Data Type",
      "Display Order",
      "Edit",
      "Delete",
    ],
    tableData: list.map((question) => [
      question.QuestionName,
      question.QuestionType,
      question.QuestionDataType,
      question.DisplayOrder,
      question.QuestionID,
      question.QuestionID,
    ]),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Machine</Card.Title>
          <Card.Divider />
          <Input
            placeholder="Enter Question Name"
            label="Question Name"
            disabledInputStyle={styles.containerInput}
            value={formState.questionName}
            onChangeText={(text) => handleInputChange("questionName", text)}
          />
          {error.displayOrder ? (
            <Text style={styles.errorText}>{error.displayOrder}</Text>
          ) : null}
          <Input
            placeholder="Enter Question Type"
            label="Question Type"
            disabledInputStyle={styles.containerInput}
            value={formState.questionType}
            onChangeText={(text) => handleInputChange("questionType", text)}
          />
          {error.displayOrder ? (
            <Text style={styles.errorText}>{error.displayOrder}</Text>
          ) : null}
          <Input
            placeholder="Enter Question Data Type"
            label="Question Data Type"
            disabledInputStyle={styles.containerInput}
            value={formState.questionDataType}
            onChangeText={(text) => handleInputChange("questionDataType", text)}
          />
          {error.displayOrder ? (
            <Text style={styles.errorText}>{error.displayOrder}</Text>
          ) : null}
          <Input
            placeholder="Enter Display Order"
            label="Display Order"
            disabledInputStyle={styles.containerInput}
            value={formState.displayOrder}
            onChangeText={(text) => handleInputChange("displayOrder", text)}
          />
          {error.displayOrder ? (
            <Text style={styles.errorText}>{error.displayOrder}</Text>
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
          <Card.Title>List Question</Card.Title>
          <CustomTable
            Tabledata={state.tableData}
            Tablehead={state.tableHead}
            editIndex={4}
            delIndex={5}
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
    marginTop: spacing.xxxs,
    marginLeft: spacing.md,
    color: colors.error,
  },
});

export default QuestionForm;
