import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors, spacing, fonts } from "../../theme";

const DropdownComponent = ({ fieldName, title, data, updatedropdown }) => {
  const [value, setValue] = useState(null);
  const [option, setOption] = useState([]);

  useEffect(() => {
    const lab = title + "Name";
    const val = title + "ID";

    setOption(
      data.map((item) => ({
        label: item[lab],
        value: item[val],
      }))
    );
  }, [data, title]);

  const handleDropdown = (newValue) => {
    updatedropdown(newValue, fieldName);
  };

  const styles = StyleSheet.create({
    dropdown: {
      margin: spacing.sm,
      height: 50,
      borderBottomColor: "gray",
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: spacing.xxs,
    },
    placeholderStyle: {
      fontSize: fonts.md,
    },
    selectedTextStyle: {
      fontSize: fonts.md,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: fonts.md,
    },
  });

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={option}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={`Select ${title}`}
      searchPlaceholder={`Search ${title}...`}
      value={value}
      onChange={handleDropdown}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
  );
};

export default DropdownComponent;
