import React, { Component } from "react";

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  StatusBar
} from "react-native";
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  Spinner,
  Header,
  Icon,
  Button,
  Form,
  Label,
  Input,
  Item,
  Content
} from "native-base";
export default class AuthForm extends Component {
  render() {
    return (
      <View style={styles.menu}>
        <Form style={styles.Form}>
          <Item>
            <Input placeholder="Email" />
          </Item>
          <Item>
            <Input placeholder="Password" />
          </Item>
          <Button style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </Button>
        </Form>
      </View>
    );
  }
}

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
  }
});
