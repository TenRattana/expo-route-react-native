import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from "react-native";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable, CustomDropdown } from "../components";
import validator from "validator";

const MachineScreen = () => {
  const [machine, setMachine] = useState([]);
  const [machineGroup, setMachineGroup] = useState([]);
  const [formState, setFormState] = useState({
    machineId: null,
    machineGroupId: null,
    machineName: null,
    displayOrder: null,
    description: null,
  });
  const [error, setError] = useState({});
  const [resetDropdown, setResetDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setFormState({
      machineId: null,
      machineGroupId: null,
      machineName: null,
      displayOrder: null,
      description: null,
    });
    setError({});
    setIsEditing(false);
  };

  const saveData = async () => {
    setIsLoading(true);
    const data = {
      MachineID: formState.machineId,
      MachineGroupID: formState.machineGroupId,
      MachineName: formState.machineName,
      DisplayOrder: formState.displayOrder,
      Description: formState.description,
    };

    try {
      await axios.post("SaveMachine", data, {
        headers: { "Content-Type": "application/json" },
      });
      setFormState({
        machineId: null,
        machineGroupId: null,
        machineName: null,
        displayOrder: null,
        description: null,
      });
      setError({});
      const response = await axios.post("GetMachines");
      setMachine(response.data || []);
      setResetDropdown(true);
      setTimeout(() => setResetDropdown(false), 0);
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
        const response = await axios.post("GetMachine", { machineID: item });
        const machineData = response.data[0] || {};

        setFormState({
          machineId: machineData.MachineID || null,
          machineGroupId: machineData.MGroupID || null,
          machineName: machineData.MachineName || null,
          description: machineData.Description || null,
          displayOrder: String(machineData.DisplayOrder) || null,
        });
      } else if (action === "del") {
        const response1 = await axios.post("DeleteMachine", {
          MachineID: item,
        });
        const response2 = await axios.post("GetMachines");
        setMachine(response2.data || []);
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
    setIsLoading(false);
  };

  const tableData = machine.map((item) => {
    const group = machineGroup.find(
      (group) => group.MGroupID === item.MGroupID
    );
    return [
      group ? group.MGroupName : "",
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

          <CustomDropdown
            fieldName="machineGroupId"
            title="Machine Group"
            label="MGroup"
            data={machineGroup}
            updatedropdown={handleChange}
            reset={resetDropdown}
            selectedValue={formState.machineGroupId}
          />

          {error.machineGroupId && (
            <Text style={styles.errorText}>{error.machineGroupId}</Text>
          )}

          <Input
            placeholder="Enter Machine Name"
            label="Machine Name"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleChange("machineName", text)}
            value={formState.machineName}
          />
          {error.machineName && (
            <Text style={styles.errorText}>{error.machineName}</Text>
          )}

          <Input
            placeholder="Enter Description"
            label="Description"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleChange("description", text)}
            value={formState.description}
          />
          {error.description && (
            <Text style={styles.errorText}>{error.description}</Text>
          )}

          <Input
            placeholder="Enter Display Order"
            label="Display Order"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleChange("displayOrder", text)}
            value={formState.displayOrder}
          />
          {error.displayOrder && (
            <Text style={styles.errorText}>{error.displayOrder}</Text>
          )}

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

export default MachineScreen;
