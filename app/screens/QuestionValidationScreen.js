import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components/index";
import DropdownComponent from "../components/CustomDropdown";
import validator from "validator";

const QuestionValidationScreen = () => {
  const [rule, setRule] = useState([]);
  const [validationRule, setValidationRule] = useState([]);
  const [formState, setFormState] = useState({
    
    machineGroupId: null,
    machineName: null,
    displayOrder: null,
    description: null,
  });
  const [error, setError] = useState({
    machineGroupId: "",
    machineName: "",
    displayOrder: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [machineResponse, machineGroupResponse] = await Promise.all([
          axios.post("GetMachines"),
          axios.post("GetMachineGroups"),
        ]);
        setMachine(machineResponse.data || []);
        setMachineGroup(machineGroupResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "machineName" && validator.isEmpty(value.trim())) {
      errorMessage = "The Machine Name field is required.";
    } else if (
      fieldName === "displayOrder" &&
      !validator.isNumeric(value.trim())
    ) {
      errorMessage = "The Display Order field must be numeric.";
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
      MachineGroupID: formState.machineGroupId,
      MachineName: formState.machineName,
      DisplayOrder: formState.displayOrder,
      Description: formState.description,
    };

    try {
      await axios.post("InsertMachine", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({
        machineGroupId: "",
        machineName: "",
        displayOrder: "",
        description: "",
      });
      setError({
        machineGroupId: "",
        machineName: "",
        displayOrder: "",
        description: "",
      });
      const response = await axios.post("GetMachines");
      setMachine(response.data || []);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleAction = (action, item) => {
    console.log(action , item);
  }
  
  const tableData = machine.map((item) => {
    const index = machineGroup.findIndex(
      (group) => group.MGroupID === item.MGroupID
    );

    return [
      index > -1 ? machineGroup[index]?.MGroupName || "" : "",
      item.MachineName,
      item.Description,
      item.DisplayOrder,
      item.MachineID,
      item.MachineID,
    ];
  });

  const tableHead = [
    "Machine Group Name",
    "Machine Name",
    "Description",
    "Display Order",
    "Edit",
    "Delete",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Machine</Card.Title>
          <Card.Divider />

          <DropdownComponent
            fieldName="machineGroupId"
            title="Machine Group"
            label="MGroup"
            data={machineGroup}
            updatedropdown={handleChange}
          />
          {error.machineGroupId ? (
            <Text style={styles.errorText}>{error.machineGroupId}</Text>
          ) : null}

          <Input
            placeholder="Enter Machine Name"
            label="Machine Name"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleChange("machineName", text)}
            value={formState.machineName}
          />
          {error.machineName ? (
            <Text style={styles.errorText}>{error.machineName}</Text>
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

          <Button
            title="Create"
            type="outline"
            containerStyle={styles.containerButton}
            disabled={!isFormValid()}
            onPress={insertData}
          />
        </Card>

        <Card>
          <Card.Title>List Machine</Card.Title>
          <CustomTable
            Tabledata={tableData}
            Tablehead={tableHead}
            editIndex={4}
            delIndex={5}
            handleAction={handleAction}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
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

export default QuestionValidationScreen;
