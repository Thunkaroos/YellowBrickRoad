"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";
import { Button } from 'native-base';

import { ViroARScene, ViroText, ViroConstants, ViroButton } from "react-viro";
import console from 'console';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonGaze = this._onButtonGaze.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
      <ViroButton
          source={require("../assets/button.png")}
          // gazeSource={require("./res/button_on_gazing.jpg")}
          tapSource={require("../assets/button.png")}
          position={[1, 3, -5]}
          height={2}
          width={3}
          onTap={() => console.log('Hello World!')}
          onGaze={this._onButtonGaze} />
      </ViroARScene> 
    );
  }

  _onButtonGaze() {
    this.setState({
        buttonStateTag: "onGaze"
    });
  }
  _onButtonTap() {
    this.setState({
        buttonStateTag: "onTap"
    });
    console.log('Hello world!')
    this.props.onExitViro();
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello Thunkaroos!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;
