import AsyncStorage from "@react-native-async-storage/async-storage";

const themeSettings = {
  colors: {
    primary: "#6200ee",
    secondary: "#03dac6",
    background: "#f6f6f6",
    light: "#ffffff",
    error: "#b00020",
    dark: "#000000",
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    extraLarge: 24,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
  },
};

const saveThemeSettings = async () => {
  try {
    await AsyncStorage.setItem("themeSettings", JSON.stringify(themeSettings));
    console.log("Theme settings saved successfully");
  } catch (error) {
    console.error("Failed to save theme settings", error);
  }
};

saveThemeSettings();
