import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Header,
  Left,
  Body,
  Text,
  Right,
  Button,
  List,
  Row,
  Col
} from "native-base";
import TourTabItem from "./tour-tab-item";

export const Profile = props => {
  const user = props.user;

  return (
    <View>
      <Header style={styles.header}>
        <Col>
          <Left />
          <Text style={styles.headerText}>Welcome Back {user.email}</Text>
          <Right />
          <Left />
          <Text style={styles.headerText}>Your Tours</Text>
          <Right />
        </Col>
      </Header>
      <List>
        {props.tours
          .filter(tour => tour.userId === user.id)
          .map(tour => (
            <TourTabItem
              key={tour.id}
              tour={tour}
              getTour={props.getTour}
              tabHandler={props.tabHandler}
            />
          ))}
      </List>
      <Button transparent style={styles.loginButton} onPress={props.logout}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

var styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 25
  },
  loginButton: {
    marginTop: 10,
    alignSelf: "center",
    width: 100
  },
  header: {
    backgroundColor: "white"
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center"
  }
});
