import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors, spacing , fonts} from "../../theme";

const data = [
  { label: 'Item 1', value: '1', search: 'Item 1' },
  { label: 'Item 2', value: '2', search: 'Item 2' },
  { label: 'Item 3', value: '3', search: 'Item 3' },
  { label: 'Item 4', value: '4', search: 'Item 4' },
  { label: 'Item 5', value: '5', search: 'Item 5' },
  { label: 'Item 6', value: '6', search: 'Item 6' },
  { label: 'Item 7', value: '7', search: 'Item 7' },
  { label: 'Item 8', value: '8', search: 'Item 8' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const NameDropDown = "Option Select"

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {NameDropDown}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        autoScroll
        search
        labelField="label"
        valueField="value"
        searchField="search"
        placeholder={!isFocus ? 'Dropdown 1' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="addfolder"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: spacing.sm,
  },
  dropdown: {
    marginLeft:"10%",
    height: spacing.xxl,
    width : "80%",
    borderColor: colors.gray90,
    borderWidth: 0.5,
    borderRadius: spacing.xxs,
    paddingHorizontal: spacing.xs,
  },
  icon: {
    top: spacing.xxs,
    marginRight: spacing.xs,
  },
  label: {
    marginLeft:"10%",
    position: 'absolute',
    backgroundColor: colors.light,
    left: spacing.lg,
    top: spacing.md,
    zIndex: 999,
    paddingHorizontal: spacing.xxs,
    fontSize: fonts.sm,
  },
  placeholderStyle: {
    fontSize: fonts.md,
  },
  selectedTextStyle: {
    top: spacing.xxs,
    fontSize: fonts.md,
  },
  iconStyle: {
    top: spacing.xxs,
    width: spacing.lg,
    height: spacing.lg,
  },
  inputSearchStyle: {
    height: spacing.xxl,
    fontSize: fonts.md,
  },
});