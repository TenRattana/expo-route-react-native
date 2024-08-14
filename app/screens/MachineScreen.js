import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button, Card, Input, Icon } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";

const MachineScreen = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post("GetMachines");
        setList(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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

  const renderHeader = (header, index) => {
    if (index === 2) {
      return (
        <View style={styles.headerCell}>
          <Icon name="create-outline" type="ionicon" size={20} />
          <Text style={styles.text}>{header}</Text>
        </View>
      );
    } else if (index === 3) {
      return (
        <View style={styles.headerCell}>
          <Icon name="trash-outline" type="ionicon" size={20} />
          <Text style={styles.text}>{header}</Text>
        </View>
      );
    }
    return (
      <View style={styles.headerCell}>
        <Text style={styles.text}>{header}</Text>
      </View>
    );
  };

  return (
    <View>
      <Card>
        <Card.Title>Create Machine</Card.Title>
        <Card.Divider />

        <Input
          placeholder="Enter Machine Name"
          label="Machine Name"
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
        <Table borderStyle={{ borderWidth: 1 }} style={styles.containerTable}>
          <Row
            data={state.tableHead.map((header, index) =>
              renderHeader(header, index)
            )}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={state.tableData}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </Card>
    </View>
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
  containerTable: {
    width: "90%",
    alignSelf: "center",
    margin: spacing.sm,
  },
  head: {
    height: 40,
    backgroundColor: colors.secondary,
  },
  text: {
    margin: spacing.sm,
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.secondary2,
  },
  headerCell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: spacing.sm,
  },
});
