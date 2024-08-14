import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input } from "@rneui/themed";
import { spacing } from "../../theme";
import { CustomTable } from "../components/index";

export default function QuestionScreen() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("GetQuestions");
        setList(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const state = {
    tableHead: [
      "Question Name",
      "Question Type",
      "Question Data Type",
      "Display Order",
      "Edit",
      "Delete",
    ],
    tableData: list.map((question) => [
      question.QuestionName,
      question.QuestionType,
      question.QuestionDataType,
      question.DisplayOrder,
      question.QuestionID,
      question.QuestionID,
    ]),
  };

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
          />
          <Input
            placeholder="Enter Question Type"
            label="Question Type"
            disabledInputStyle={styles.containerInput}
          />
          <Input
            placeholder="Enter Question Data Type"
            label="Question Data Type"
            disabledInputStyle={styles.containerInput}
          />

          <Input
            placeholder="Enter Display Data"
            label="Display Data"
            disabledInputStyle={styles.containerInput}
          />

          <Button
            title="Create"
            type="outline"
            containerStyle={styles.containerButton}
          />
        </Card>

        <Card>
          <Card.Title>List Machine</Card.Title>
          <CustomTable
            Tabledata={state.tableData}
            Tablehead={state.tableHead}
            editIndex={4}
            delIndex={5}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerTable: {
    width: "90%",
    alignSelf: "center",
    margin: spacing.sm,
  },
});
