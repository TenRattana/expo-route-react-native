import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { colors, spacing } from "../../theme";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";

const styles = StyleSheet.create({
  containerTable: {
    width: "90%",
    alignSelf: "center",
    margin: spacing.sm,
  },
  head: {
    height: 40,
    backgroundColor: colors.secondary,
  },
  headerCell: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: spacing.sm,
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.secondary2,
  },
});

const HeaderCell = ({ header, iconName }) => (
  <View style={styles.headerCell}>
    {iconName && <Icon name={iconName} type="ionicon" size={20} />}
    <Text style={styles.text}>{header}</Text>
  </View>
);

const renderHeader = (header, index, editIndex, delIndex) => {
  if (index === editIndex) {
    return <HeaderCell key={index} header={header} iconName="create-outline" />;
  } else if (index === delIndex) {
    return <HeaderCell key={index} header={header} iconName="trash-outline" />;
  }
  return <HeaderCell key={index} header={header} />;
};

export const CustomTable = ({ Tabledata, Tablehead, editIndex, delIndex }) => (
  <View>
    <Table borderStyle={{ borderWidth: 1 }} style={styles.containerTable}>
      <Row
        data={Tablehead.map((header, index) =>
          renderHeader(header, index, editIndex, delIndex)
        )}
        style={styles.head}
        textStyle={styles.text}
      />
      <TableWrapper>
        <Rows
          data={Tabledata}
          textStyle={{ margin: spacing.sm }}
          style={styles.row}
        />
      </TableWrapper>
    </Table>
  </View>
);
