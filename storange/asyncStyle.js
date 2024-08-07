import AsyncStorage from "@react-native-async-storage/async-storage";

const text_input = {
  textContent: {
    fontSize: 16,
    margin: 5,
    marginLeft: 10,
  },
  inputText: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "center",
    paddingLeft: 20,
    margin: 8,
  },
};

const check_box = {
  textContent: {
    fontSize: 16,
    margin: 5,
    marginLeft: 10,
  },
  contarinerList: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  checkbox: {
    width: 30,
    height: 30,
  },
  textCheckbox: {
    marginLeft: 8,
  },
};

const index = {
  container: {
    flex: 1,
    padding: 16,
  },
  textHead: {
    fontSize: 25,
    alignSelf: "center",
    margin: 15,
  },
  buttonSubmit: {
    marginTop: 40,
    width: "50%",
    height: 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
  },
  fixToText: {
    color: "#fff",
    fontSize: 16,
  },
};

const saveStyles = async () => {
  await AsyncStorage.setItem("check_box", JSON.stringify(check_box));
  await AsyncStorage.setItem("text_input", JSON.stringify(text_input));
  await AsyncStorage.setItem("index", JSON.stringify(index));
};

saveStyles();
