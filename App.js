import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TaskList from "./Components/TaskList";

import NewTaskScreen from "./Screens/NewTask";

import {
  Provider as PaperProvider,
  FAB,
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

const options = {
  headerStyle: {
    backgroundColor: "#3498db",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

function HomeScreen({ navigation }, props) {
  const [tasks, setTasks] = React.useState([]);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    async function fetchTasks() {
      var result = await AsyncStorage.getItem("tasks");
      result = JSON.parse(result);
      setTasks(result);
    }

    fetchTasks();
  }, [props, isFocused]);

  const deleteTask = async (index) => {
    tasks.splice(index, 1);
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    setTasks(['123'])
    setTasks(tasks);
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Your Tasks for Today</Text>
      </View>
      <ScrollView>
        {
          /* List of Tasks */
          tasks.map((item, index) => (
            <TouchableOpacity key={index}>
              <TaskList name={item} index={index} deletFunc={deleteTask} />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        small={false}
        icon="plus"
        onPress={() => navigation.navigate("New Task")}
      />
    </PaperProvider>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TO-DO" options={options} component={HomeScreen} />
        <Stack.Screen
          name="New Task"
          options={options}
          component={NewTaskScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    color: "#fff",
  },
  headerStyle : {
    marginTop : 12,
    marginBottom : 7,
    justifyContent : "center",
    flexDirection : "row",
  },
  headerText : {
    fontSize : 20,
    fontWeight : "bold"
  }
});
