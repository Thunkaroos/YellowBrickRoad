import React, { Component } from "react";

import { Text, View, StyleSheet } from "react-native";
import { Button, Header } from "native-base";
export default class ARView extends Component {
  render() {
    return (
      <View>
        <Header style={styles.header}>
          <Text style={styles.headerText}>Create your own Tour</Text>
          <Text></Text>
        </Header>
        <Button
          style={styles.button}
          onPress={this.props._getExperienceButtonOnPress(
            this.props.AR_EDITOR_TYPE
          )}
        >
          <View>
            <Text style={styles.buttonText}>Tour Editor</Text>
          </View>
        </Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    textAlignVertical: "center",
    maxHeight: 40
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    position: "absolute",
    top: 10
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    marginLeft: 25
  },
  button: {
    marginTop: 50,
    alignSelf: "center",
    width: 160,
    height: 60
  }
});
