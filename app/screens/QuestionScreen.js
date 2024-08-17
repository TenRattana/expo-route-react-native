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
    questionId: null,
    questionName: null,
  });
  const [error, setError] = useState({});

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

  const handleChange = (fieldName, value) => {
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
      Object.values(formState).every(
        (value) => value === "" || value === null || value.trim() !== ""
      ) && Object.values(error).every((err) => err === "")
    );
  };

  const saveData = async () => {
    const data = {
      QuestionID: formState.questionId,
      QuestionName: formState.questionName,
    };

    try {
      await axios.post("SaveQuestion", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({ questionId: null, questionName: null });
      setError({});
      const response = await axios.post("GetQuestions");
      setQuestion(response.data || []);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleAction = async (action, item) => {
    try {
      if (action === "edit") {
        const response = await axios.post("GetQuestion", { QuestionID: item });
        const questionData = response.data[0] || {};

        setFormState({
          questionId: questionData.QuestionID || null,
          questionName: questionData.QuestionName || null,
        });
      } else if (action === "del") {
        const response1 = await axios.post("DeleteQuestion", {
          QuestionID: item,
        });
        const response2 = await axios.post("GetQuestions");
        setQuestion(response2.data || []);
      }
    } catch (error) {
      console.error("Error fetching question data:", error);
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
            onChangeText={(text) => handleChange("questionName", text)}
          />
          {error.questionName ? (
            <Text style={styles.errorText}>{error.questionName}</Text>
          ) : null}

          <Button
            title="Create"
            type="outline"
            containerStyle={styles.containerButton}
            disabled={!isFormValid()}
            onPress={saveData}
          />
        </Card>

        <Card>
          <Card.Title>List Question</Card.Title>
          <CustomTable
            Tabledata={tableData}
            Tablehead={tableHead}
            editIndex={1}
            delIndex={2}
            handleAction={handleAction}
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
