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
export default class ARView extends Component {
  render() {
    return (
      <Button
        style={styles.buttons}
        onPress={this.props._getExperienceButtonOnPress(
          this.props.AR_NAVIGATOR_TYPE
        )}
      >
        <Text style={styles.buttonText}>AR View</Text>
      </Button>
    );
  }
}

var styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 40
  },
  buttons: {
    marginTop: 10,
    alignSelf: "center",
    width: 150
  }
});
