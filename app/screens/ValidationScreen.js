import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components";
import validator from "validator";

const ValidationScreen = () => {
  const [validation, setValidation] = useState([]);
  const [formState, setFormState] = useState({
    ruleId: null,
    ruleName: null,
    ruleValue: null,
  });
  const [error, setError] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [validationResponse] = await Promise.all([
          axios.post("GetValidationRules"),
        ]);
        setValidation(validationResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "ruleName" && validator.isEmpty(value.trim())) {
      errorMessage = "The Rule Name field is required.";
    } else if (fieldName === "ruleValue" && validator.isEmpty(value.trim())) {
      errorMessage = "The Rule Value field is required.";
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
        if (!isEditing && key === "machineId") {
          return true;
        }
        return value !== "" && value !== null && String(value).trim() !== "";
      }) && Object.values(error).every((err) => err === "")
    );
  };

  const resetForm = () => {
    setFormState({ ruleId: null, ruleName: null, ruleValue: null });
    setError({});
    setIsEditing(false);
  };

  const saveData = async () => {
    const data = {
      RuleID: formState.ruleId,
      RuleName: formState.ruleName,
      RuleValue: formState.ruleValue,
    };

    try {
      await axios.post("SaveValidation", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({ ruleId: null, ruleName: null, ruleValue: null });
      setError({});
      const response = await axios.post("GetValidationRules");
      setValidation(response.data || []);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleAction = async (action, item) => {
    try {
      if (action === "edit") {
        const response = await axios.post("GetValidationRule", {
          RuleID: item,
        });
        const validationData = response.data[0] || {};

        setFormState({
          ruleId: validationData.RuleID || null,
          ruleName: validationData.RuleName || null,
          ruleValue: validationData.RuleValue || null,
        });
      } else if (action === "del") {
        const response1 = await axios.post("DeleteValidation", {
          RuleID: item,
        });
        const response2 = await axios.post("GetValidationRules");
        setValidation(response2.data || []);
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  };

  const tableData = validation.map((item) => {
    return [item.RuleName, item.RuleValue, item.RuleID, item.RuleID];
  });

  const tableHead = ["Rule Name", "Rule Value", "Edit", "Delete"];

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
            onChangeText={(text) => handleChange("ruleName", text)}
            value={formState.ruleName}
          />
          {error.ruleName ? (
            <Text style={styles.errorText}>{error.ruleName}</Text>
          ) : null}

          <Input
            placeholder="Enter Rule Value"
            label="Rule Value"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleChange("ruleValue", text)}
            value={formState.ruleValue}
          />
          {error.ruleValue ? (
            <Text style={styles.errorText}>{error.ruleValue}</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <Button
              title="Create"
              type="outline"
              containerStyle={styles.containerButton}
              disabled={!isFormValid()}
              onPress={saveData}
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
          <Card.Title>List Option</Card.Title>
          <CustomTable
            Tabledata={tableData}
            Tablehead={tableHead}
            editIndex={2}
            delIndex={3}
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

export default ValidationScreen;
