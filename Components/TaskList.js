import React from "react";
import { Alert, StyleSheet, Text, View, AsyncStorage } from "react-native";

import {
  Provider as PaperProvider,
  Card,
  TextInput,
  Button,
  DefaultTheme,
  Title,
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

export default function TaskList(props) {

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content style={styles.cardRow}>
          <Title style={styles.title}>{props.name}</Title>
          <Button icon="delete" color="red" style={styles.deleteBtn} onPress={()=>props.deletFunc(props.index)}></Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card : {
    margin : 10,
    shadowRadius : 2,
    shadowColor : "#000000",
  },
  title : {
    fontSize : 15,
    justifyContent : "space-between"
  },
  cardRow : {
    flexDirection : "row",
    justifyContent : "space-between",
  },
  deleteBtn : {
  }
})