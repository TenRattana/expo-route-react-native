import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components/index";
import validator from "validator";

const QuestionValidationScreen = () => {
  const [list, setList] = useState([]);
  const [formState, setFormState] = useState({
    ruleName: "",
    ruleValue: "",
  });
  const [error, setError] = useState({
    ruleName: "",
    ruleValue: "",
  });

  useEffect(() => {
    const getValidationRules = async () => {
      try {
        const response = await axios.post("GetValidationRules");
        setList(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getValidationRules();
  }, []);

  const handleInputChange = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "ruleName") {
      if (validator.isEmpty(value.trim())) {
        errorMessage = "The Rule Name field is required.";
      }
    } else if (fieldName === "ruleValue") {
      if (validator.isEmpty(value.trim())) {
        errorMessage = "The Rule Value field is required.";
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
      formState.ruleName.trim() !== "" &&
      formState.ruleValue.trim() !== "" &&
      error.ruleName === "" &&
      error.ruleValue === ""
    );
  };

  const insertData = async () => {
    const data = {
      RuleName: formState.ruleName,
      RuleValue: formState.ruleValue,
    };

    try {
      await axios.post("InsertQuestionOption", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({ ruleName: "", ruleValue: "" });
      setError({ ruleName: "", ruleValue: "" });
      const response = await axios.post("GetValidationRules");
      setList(response.data || []);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const state = {
    tableHead: ["Rule Name", "Rule Value", "Edit", "Delete"],
    tableData: list.map((item) => [
      item.RuleName,
      item.RuleValue,
      item.RuleID,
      item.RuleID,
    ]),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Rule</Card.Title>
          <Card.Divider />

          <Input
            placeholder="Enter Rule Name"
            label="Rule Name"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleInputChange("ruleName", text)}
            value={formState.ruleName}
          />
          {error.ruleName ? (
            <Text style={styles.errorText}>{error.ruleName}</Text>
          ) : null}

          <Input
            placeholder="Enter Rule Value"
            label="Rule Value"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleInputChange("ruleValue", text)}
            value={formState.ruleValue}
          />
          {error.ruleValue ? (
            <Text style={styles.errorText}>{error.ruleValue}</Text>
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
            editIndex={2}
            delIndex={3}
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

export default QuestionValidationScreen;
