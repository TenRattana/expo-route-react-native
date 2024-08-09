import { Stack } from "expo-router";
import asyncStyle from "../storange/asyncStyle";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTransparent: false, 
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'KFM ตารางเช็คเครื่องจักร' }}
      />
    </Stack>
  );
}
