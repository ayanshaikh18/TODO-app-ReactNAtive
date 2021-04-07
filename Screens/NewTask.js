import React from "react";
import { Alert, StyleSheet, Text, View, AsyncStorage } from "react-native";

import {
  Provider as PaperProvider,
  Card,
  TextInput,
  Button,
  DefaultTheme,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#3498db",
  },
};

export default function NewTaskScreen({ navigation }) {
  const [text, setText] = React.useState("");
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    async function fetchTasks() {
      var result = await AsyncStorage.getItem("tasks");
      result = JSON.parse(result) 
      await setTasks(result);
    }
    fetchTasks()
  }, []);

  const onSubmit = async () => {
    await setTasks([...tasks, text]);
    await AsyncStorage.setItem("tasks", JSON.stringify([...tasks, text]));
    navigation.navigate("TO-DO")
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.newTask}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContainer}>
            <TextInput
              label="Task Name"
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <View style={styles.btnRow}>
              <Button
                style={styles.btn}
                icon="plus"
                mode="contained"
                onPress={() => onSubmit()}
              >
                Create
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  newTask: {
    justifyContent: "center",
  },
  card: {
    marginTop: "40%",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  btn: {
    marginTop: 20,
    borderRadius: 10,
    width: 150,
    fontSize: 35,
  },
  cardContainer: {
    margin: 25,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
