import { StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { CustomTable } from "../components/index";
import validator from "validator";

const MachineScreen = () => {
  const [list, setList] = useState([]);
  const [machineName, setMachineName] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [error, setError] = useState({ machineName: "", displayOrder: "" });
  const [show, setShow] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.post("GetMachines");
      setList(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const state = {
    tableHead: ["Machine Name", "Display Order", "Edit", "Delete"],
    tableData: list.map((machine) => [
      machine.MachineName,
      machine.DisplayOrder,
      machine.MachineID,
      machine.MachineID,
    ]),
  };

  const handleMachineNameChange = (text) => {
    let errorMessage = "";

    if (validator.isEmpty(text.trim())) {
      errorMessage = "The Machine Name field is required.";
    }

    setError({ ...error, machineName: errorMessage });
    setMachineName(text);

    if (!errorMessage && !error.displayOrder) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleDisplayOrderChange = (text) => {
    let errorMessage = "";

    if (!validator.isNumeric(text)) {
      errorMessage = "The Display Order field is Numeric.";
    }

    setError({ ...error, displayOrder: errorMessage });
    setDisplayOrder(text);

    if (!errorMessage && !error.machineName) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const insertData = async () => {
    const data = {
      MachineName: machineName,
      DisplayOrder: displayOrder,
    };

    console.log(data);

    try {
      await axios.post("InsertMachine", data, {
        headers: { "Content-Type": "application/json" },
      });
      getData(); 
      setMachineName(""); 
      setDisplayOrder("");
      setError({ machineName: "", displayOrder: "" });
      setShow(false);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Card.Title>Create Machine</Card.Title>
          <Card.Divider />

          <Input
            placeholder="Enter Machine Name"
            label="Machine Name"
            disabledInputStyle={styles.containerInput}
            onChangeText={handleMachineNameChange}
            value={machineName}
          />
          {error.machineName ? (
            <Text style={styles.errorText}>{error.machineName}</Text>
          ) : null}

          <Input
            placeholder="Enter Display Order"
            label="Display Order"
            disabledInputStyle={styles.containerInput}
            onChangeText={handleDisplayOrderChange}
            value={displayOrder}
          />
          {error.displayOrder ? (
            <Text style={styles.errorText}>{error.displayOrder}</Text>
          ) : null}

          <Button
            title="Create"
            type="outline"
            containerStyle={styles.containerButton}
            disabled={
              !show || error.machineName !== "" || error.displayOrder !== ""
            }
            onPress={insertData}
          />
        </Card>

        <Card>
          <Card.Title>List Machine</Card.Title>
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

export default MachineScreen;

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
