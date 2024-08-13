// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import axios from "../config/axios";
// import TextInputComponent from "./components/TextInputComponent";
// import CheckBoxComponent from "./components/CheckBoxComponent";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const fetchData = async () => {
//   try {
//     const response = await axios.post("GetFormMachine", {
//       machineQR: "SEPARATOR S.7",
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// };

// const Index = () => {
//   const [list, setList] = useState([]);
//   const [nameMachine, setNameMachine] = useState("");
//   const [themes, setThemes] = useState({});

//   useEffect(() => {
//     const getData = async () => {
//       const data = await fetchData();
//       setList(data || []);
//       setNameMachine(data[0]?.Name_Machine_Group || "Unknown");

//       try {
//         const storedStyles = await AsyncStorage.getItem("themeSettings");
//         if (storedStyles) setThemes(JSON.parse(storedStyles));
//       } catch (error) {
//         console.error("Error fetching styles from AsyncStorage:", error);
//       }
//     };

//     getData();
//   }, []);

//   const postData = async (datas) => {
//     const formattedData = datas.map(
//       ({ Id_Checking_Process, Id_Inspection_Order, Value, Subdetail }) => ({
//         Id_Checking_Process,
//         Id_Inspection_Order,
//         Value,
//         Subdetail,
//       })
//     );

//     const data = { Odata: formattedData };
//     console.log(data.Odata[2]);

//     // Uncomment the lines below to enable the API request
//     // try {
//     //   const response = await axios.post("InsertFormMachine", data, {
//     //     headers: { "Content-Type": "application/json" },
//     //   });
//     //   console.log(response.data);
//     // } catch (error) {
//     //   console.error("Error posting data:", error);
//     // }
//   };

//   const styles = StyleSheet.create({
//     textContent: {
//       fontSize: themes.fontSizes ? themes.fontSizes.extraLarge : 24,
//       alignSelf: "center",
//       margin: themes.spacing ? themes.spacing.small : 8,
//     },
//     buttonSubmit: {
//       marginTop: 40,
//       width: "50%",
//       height: 40,
//       alignSelf: "center",
//       justifyContent: "center",
//       alignItems: "center",
//       borderRadius: 10,
//       elevation: 3,
//       backgroundColor: "black",
//     },
//     fixToText: {
//       color: themes.colors ? themes.colors.surface : "#fff",
//       fontSize: 16,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.textContent}>KFM ตารางตรวจเช็คเครื่องจักร</Text>
//       <Text style={styles.textContent}>รุ่น {nameMachine}</Text>

//       <FlatList
//         data={list}
//         keyExtractor={(item) => item.Id_Checking_Process.toString()}
//         renderItem={({ item, index }) => (
//           <View key={index}>
//             {item.Name_Field_Group === "TEXT_INPUT" ? (
//               <TextInputComponent
//                 data={{ item, index, list }}
//                 updateText={setList}
//               />
//             ) : item.Name_Field_Group === "CHECK_BOX" ? (
//               <CheckBoxComponent
//                 data={{ item, index, list }}
//                 updateList={setList}
//               />
//             ) : null}
//           </View>
//         )}
//       />

//       <TouchableOpacity
//         style={styles.buttonSubmit}
//         onPress={() => postData(list)}
//       >
//         <Text style={styles.fixToText}>SUBMIT</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Index;
