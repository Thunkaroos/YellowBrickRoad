/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import {Provider} from 'react-redux'
import store from './client/js/store/index.js'
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
  Header,
  Icon,
  Button,
  Form,
  Label,
  Input,
  Item,
  Content
} from "native-base";
import { ViroVRSceneNavigator, ViroARSceneNavigator } from "react-viro";
import AuthForm from "./client/js/components/auth-form";
import ARView from "./client/js/components/AR-view";
// import TourView from "./client/js/components/tours-view";

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "API_KEY_HERE"
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./client/js/HelloWorldSceneAR");
var InitialVRScene = require("./client/js/HelloWorldScene");

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <Provider store={store}>
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
        <Header style={styles.header} hasTabs />
        <Tabs>
          <Tab
            heading={
              <TabHeading style={styles.header}>
                <Text>Main Menu</Text>
              </TabHeading>
            }
          >
            <AuthForm />
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.header}>
                <Text>AR</Text>
              </TabHeading>
            }
          >
            <ARView
              _getExperienceButtonOnPress={this._getExperienceButtonOnPress}
              AR_NAVIGATOR_TYPE={AR_NAVIGATOR_TYPE}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.header}>
                <Text>Tours</Text>
              </TabHeading>
            }
          >
            {/* <TourView /> */}
          </Tab>
        </Tabs>
      </Container>
      </Provider>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
        onExitViro={this._exitViro}
      />
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }}
        onExitViro={this._exitViro}
      />
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

var styles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 25
  },
  exitButton: {
    marginTop: 10,
    alignSelf: "center",
    width: 100
  }
});

module.exports = App;
