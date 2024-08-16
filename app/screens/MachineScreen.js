import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components/index";
import validator from "validator";
import DropdownComponent from "../components/CustomDropdown";

const MachineScreen = () => {
  const [machine, setMachine] = useState([]);
  const [machineGroup, setMachineGroup] = useState([]);
  const [formState, setFormState] = useState({
    machineGroupId: "",
    machineName: "",
    displayOrder: "",
    description: "",
  });
  const [error, setError] = useState({
    machineGroupId: "",
    machineName: "",
    displayOrder: "",
    description: "",
  });

  useEffect(() => {
    const getMachine = async () => {
      try {
        const response = await axios.post("GetMachines");
        setMachine(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getMachineGroup = async () => {
      try {
        const response = await axios.post("GetMachineGroups");
        setMachineGroup(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getMachine();
    getMachineGroup();
  }, []);

  const handleInputChange = (fieldName, value) => {
    let errorMessage = "";

    if (fieldName === "machineName") {
      if (validator.isEmpty(value.trim())) {
        errorMessage = "The Machine Name field is required.";
      }
    } else if (fieldName === "displayOrder") {
      if (!validator.isNumeric(value.trim())) {
        errorMessage = "The Display Order field is Numeric.";
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
      formState.machineGroupId.trim() !== "" &&
      formState.machineName.trim() !== "" &&
      formState.displayOrder.trim() !== "" &&
      formState.description.trim() !== "" &&
      error.machineGroupId === "" &&
      error.machineName === "" &&
      error.displayOrder === "" &&
      error.description === ""
    );
  };

  const updatedropdown = (value, fieldName) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
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

  const state = {
    tableHead: [
      "Machine Group Name",
      "Machine Name",
      "Description",
      "Display Order",
      "Edit",
      "Delete",
    ],
    tableData: machine.map((item) => [
      item.MGroupID,
      item.MachineName,
      item.Description,
      item.DisplayOrder,
      item.MachineID,
      item.MachineID,
    ]),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Machine</Card.Title>
          <Card.Divider />

          <DropdownComponent
            fieldName="machineGroupId"
            title="MGroup"
            data={machineGroup}
            updatedropdown={updatedropdown}
          />
          {error.machineGroupId ? (
            <Text style={styles.errorText}>{error.machineGroupId}</Text>
          ) : null}

          <Input
            placeholder="Enter Machine Name"
            label="Machine Name"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleInputChange("machineName", text)}
            value={formState.machineName}
          />
          {error.machineName ? (
            <Text style={styles.errorText}>{error.machineName}</Text>
          ) : null}

          <Input
            placeholder="Enter Display Order"
            label="Display Order"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleInputChange("displayOrder", text)}
            value={formState.displayOrder}
          />
          {error.displayOrder ? (
            <Text style={styles.errorText}>{error.displayOrder}</Text>
          ) : null}

          <Input
            placeholder="Enter Description"
            label="Description"
            disabledInputStyle={styles.containerInput}
            onChangeText={(text) => handleInputChange("description", text)}
            value={formState.description}
          />
          {error.displayOrder ? (
            <Text style={styles.errorText}>{error.description}</Text>
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
          <Card.Title>List Machine</Card.Title>
          <CustomTable
            Tabledata={state.tableData}
            Tablehead={state.tableHead}
            editIndex={3}
            delIndex={4}
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

export default MachineScreen;
