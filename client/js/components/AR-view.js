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
      <View>
        <Button
          style={styles.buttons}
          onPress={this.props._getExperienceButtonOnPress(
            this.props.AR_NAVIGATOR_TYPE
          )}
        >
          <Text style={styles.buttonText}>Tour Viewer</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={this.props._getExperienceButtonOnPress(
            this.props.AR_EDITOR_TYPE
          )}
        >
          <Text style={styles.buttonText}>Tour Editor</Text>
        </Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 33
  },
  buttons: {
    marginTop: 200,
    alignSelf: "center",
    width: 150
  },
  button: {
    marginTop: 10,
    alignSelf: "center",
    width: 150
  }
});
