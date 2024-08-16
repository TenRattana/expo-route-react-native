import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components/index";
import DropdownComponent from "../components/CustomDropdown";
import validator from "validator";

const QuestionDetailScreen = () => {
  const [detailQuestion, setDetailQuestion] = useState([]);
  const [question, setQuestion] = useState([]);
  const [option, setOption] = useState([]);
  const [formState, setFormState] = useState({
    questionId: "",
    optionId: "",
    displayOrder: "",
    description: "",
  });
  const [error, setError] = useState({
    questionId: "",
    optionId: "",
    displayOrder: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionResponse, optionResponse, questionDetailResponse] =
          await Promise.all([
            axios.post("GetQuestions"),
            axios.post("GetQuestionOptions"),
            axios.post("GetQuestionDetails"),
          ]);
        setQuestion(questionResponse.data || []);
        setOption(optionResponse.data || []);
        setDetailQuestion(questionDetailResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "description" && validator.isEmpty(value.trim())) {
      errorMessage = "The Description field is required.";
    } else if (
      fieldName === "displayOrder" &&
      validator.isEmpty(value.trim())
    ) {
      errorMessage = "The Display Order field is required.";
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
      QuestionID: formState.questionId,
      OptionID: formState.optionId,
      DisplayOrder: formState.displayOrder,
      Description: formState.description,
    };

    try {
      await axios.post("InsertQuestionDetail", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({
        questionId: "",
        optionId: "",
        displayOrder: "",
        description: "",
      });
      setError({
        questionId: "",
        optionId: "",
        displayOrder: "",
        description: "",
      });
      const response = await axios.post("GetQuestionDetails");
      setDetailQuestion(response.data || []);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const tableData = detailQuestion.map((item) => {
    const indexQ = question.findIndex(
      (group) => group.QuestionID === item.QuestionID
    );
    const indexO = option.findIndex(
      (group) => group.OptionID === item.OptionID
    );

    return [
      item.MOptionID,
      indexQ > -1 ? question[indexQ]?.QuestionName || "" : "",
      indexO > -1 ? option[indexO]?.OptionName || "" : "",
      item.Description,
      item.DisplayOrder,
      item.ID,
      item.ID,
    ];
  });

  const tableHead = [
    "Match Option ID",
    "Question Name",
    "Option Name",
    "Description",
    "DisplayOrder",
    "Edit",
    "Delete",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Question Detail</Card.Title>
          <Card.Divider />

          <DropdownComponent
            fieldName="questionId"
            title="Question"
            label="Question"
            data={question}
            updatedropdown={handleChange}
          />
          {error.questionId ? (
            <Text style={styles.errorText}>{error.questionId}</Text>
          ) : null}

          <DropdownComponent
            fieldName="optionId"
            title="Option"
            label="Option"
            data={option}
            updatedropdown={handleChange}
          />
          {error.optionId ? (
            <Text style={styles.errorText}>{error.optionId}</Text>
          ) : null}

          <Input
            placeholder="Enter Description"
            label="Description"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleChange("description", text)}
            value={formState.description}
          />
          {error.description ? (
            <Text style={styles.errorText}>{error.description}</Text>
          ) : null}

          <Input
            placeholder="Enter Display Order"
            label="Display Order"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleChange("displayOrder", text)}
            value={formState.displayOrder}
          />
          {error.displayOrder ? (
            <Text style={styles.errorText}>{error.displayOrder}</Text>
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
          <Card.Title>List Option</Card.Title>
          <CustomTable
            Tabledata={tableData}
            Tablehead={tableHead}
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
