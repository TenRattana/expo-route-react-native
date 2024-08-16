import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components/index";
import validator from "validator";

const QuestionForm = () => {
  const [question, setQuestion] = useState([]);
  const [formState, setFormState] = useState({
    questionName: "",
  });
  const [error, setError] = useState({
    questionName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionResponse] = await Promise.all([
          axios.post("GetQuestions"),
        ]);
        setQuestion(questionResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "questionName" && validator.isEmpty(value.trim())) {
      errorMessage = "The Question Name field is required.";
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

  const isFormValid = () => {
    return (
      Object.values(formState).every((value) => String(value).trim() !== "") &&
      Object.values(error).every((err) => err === "")
    );
  };

  const insertData = async () => {
    const data = {
      QuestionName: formState.questionName,
    };

    try {
      await axios.post("InsertQuestion", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({ questionName: "" });
      setError({ questionName: "" });
      const response = await axios.post("GetQuestions");
      setQuestion(response.data || []);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const tableData = question.map((item) => {
    return [item.QuestionName, item.QuestionID, item.QuestionID];
  });

  const tableHead = ["Question Name", "Edit", "Delete"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Question</Card.Title>
          <Card.Divider />
          <Input
            placeholder="Enter Question Name"
            label="Question Name"
            disabledInputStyle={styles.containerInput}
            value={formState.questionName}
            onChangeText={(text) => handleInputChange("questionName", text)}
          />
          {error.questionName ? (
            <Text style={styles.errorText}>{error.questionName}</Text>
          ) : null}

          <Button
            title="Create"
            type="outline"
            containerStyle={styles.containerButton}
            disabled={!isFormValid()}
            onPress={insertData}
          />
        </Card>

        <Card>
          <Card.Title>List Question</Card.Title>
          <CustomTable
            Tabledata={tableData}
            Tablehead={tableHead}
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

export default QuestionForm;
