import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components";
import validator from "validator";

const QuestionForm = () => {
  const [question, setQuestion] = useState([]);
  const [formState, setFormState] = useState({
    questionId: null,
    questionName: null,
  });
  const [error, setError] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      Object.keys(formState).every((key) => {
        const value = formState[key];
        if (!isEditing && key === "questionId") {
          return true;
        }
        return value !== "" && value !== null && String(value).trim() !== "";
      }) && Object.values(error).every((err) => err === "")
    );
  };

  const resetForm = () => {
    setFormState({ questionId: null, questionName: null });
    setError({});
    setIsEditing(false);
  };

  const saveData = async () => {
    setIsLoading(true);
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
      setIsEditing(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
    setIsLoading(false);
  };

  const handleAction = async (action, item) => {
    setIsLoading(true);
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
    setIsLoading(false);
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

          <View style={styles.buttonContainer}>
            <Button
              title="Create"
              type="outline"
              containerStyle={styles.containerButton}
              disabled={!isFormValid()}
              onPress={saveData}
              loading={isLoading}
            />
            <Button
              title="Reset"
              type="outline"
              containerStyle={styles.containerButton}
              onPress={resetForm}
            />
          </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
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
