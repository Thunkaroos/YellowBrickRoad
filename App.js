/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./client/js/store/index.js";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  StatusBar,
  Image
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
import TourView from "./client/js/components/tours-view";
import { addPoint } from "./client/js/store/points.js";


/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "API_KEY_HERE"
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./client/js/HelloWorldSceneAR");
var InitialARSceneEditor = require("./client/js/AR-Editor");
var InitialVRScene = require("./client/js/HelloWorldScene");

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
var AR_EDITOR_TYPE = "AREditor";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      initialPage: 0,
      page: 1,
      tourId: ""
    };
    this._startApp = this._startApp.bind(this);
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getAREditor = this._getAREditor.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this.tabHandler = this.tabHandler.bind(this)
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
    } else if (this.state.navigatorType == AR_EDITOR_TYPE) {
      return this._getAREditor();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <Provider store={store}>
        <Container>
          <StatusBar />
          <Header style={styles.header} hasTabs />
          <Tabs  page = {this.state.page} initialPage = {this.state.initialPage}>
            <Tab
              heading={
                <TabHeading style={styles.header}>
                  <Text>Profile</Text>
                </TabHeading>
              }
            >
              <AuthForm tabHandler = {this.tabHandler}/>
            </Tab>

            <Tab
              heading={
                <TabHeading style={styles.header}>
                  <Text>Editor</Text>
                </TabHeading>
              }
            >
              <ARView
                _getExperienceButtonOnPress={this._getExperienceButtonOnPress}
                AR_NAVIGATOR_TYPE={AR_NAVIGATOR_TYPE}
                AR_EDITOR_TYPE={AR_EDITOR_TYPE}
              />
            </Tab>
            <Tab
              heading={
                <TabHeading style={styles.header}>
                  <Text>Tours</Text>
                </TabHeading>
              }
            >
              <TourView
                _getExperienceButtonOnPress={this._getExperienceButtonOnPress}
                AR_NAVIGATOR_TYPE={AR_NAVIGATOR_TYPE}
              />
            </Tab>
          </Tabs>
        </Container>
      </Provider>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={styles.outer}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
          viroAppProps={{ tourId: this.state.tourId }}
          onExitViro={this._exitViro}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 10,
            alignItems: "flex-start"
          }}
        >
          <TouchableHighlight
            onPress={() => this._exitViro()}
            style={styles.buttons}
            underlayColor={"#00000000"}
          >
            <Image source={require("./client/js/res/icon_left_w.png")} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _getAREditor() {
    return (
      <Provider store={store}>
        <View style={styles.outer}>
          <ViroARSceneNavigator
            {...this.state.sharedProps}
            initialScene={{ scene: InitialARSceneEditor }}
            onExitViro={this._exitViro}
          />
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 10,
              alignItems: "flex-start"
            }}
          >
            <TouchableHighlight
              onPress={() => this._exitViro()}
              style={styles.buttons}
              underlayColor={"#00000000"}
            >
              <Image source={require("./client/js/res/icon_left_w.png")} />
            </TouchableHighlight>
          </View>
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 25,
              alignItems: "flex-end"
            }}
          >
            <TouchableHighlight
              style={styles.buttons}
              underlayColor={"#00000000"}
            >
              <Image source={require("./client/js/res/icon_repeat.png")} />
            </TouchableHighlight>
          </View>
          <View
            style={{
              position: "absolute",
              left: 10,
              right: 0,
              bottom: 20,
              alignItems: "flex-start"
            }}
          >
            <TouchableHighlight
              onPress = {(e) => this._startApp()}
              style={styles.UIButton}
              underlayColor={"#00000000"}
              // onTrackingUpdated={this._onInitialized}
            >
              <Text style={styles.buttonText}>Start</Text>
              {/* <Image source={require("./client/js/res/button_start.png")} /> */}
            </TouchableHighlight>
          </View>
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 15,
              bottom: 20,
              alignItems: "flex-end"
            }}
          >
            <TouchableHighlight
              style={styles.UIButton}
              underlayColor={"#00000000"}
            >
              <Text style={styles.buttonText}>Stop</Text>
              {/* <Image source={require("./client/js/res/button_stop.png")} /> */}
            </TouchableHighlight>
          </View>
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 20,
              alignItems: "center"
            }}
          >
            <TouchableHighlight
              onPress = {(e) => store.dispatch(addPoint([0, 0, -10]))}
              style={styles.MainButton}
              underlayColor={"#00000000"}
            >
              <Text style={styles.mainButtonText}>Drop</Text>
              {/* <Image source={require("./client/js/res/button_marker.png")} /> */}
            </TouchableHighlight>
          </View>
        </View>
      </Provider>
    );
  }

 tabHandler() {
   this.setState({
  page: 2,
  initialPage: 2
})}

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
  _getExperienceButtonOnPress(navigatorType, tourId = "") {
    return () => {
      this.setState({
        navigatorType: navigatorType,
        tourId: tourId
      });
    };
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }

  _startApp(state, reason) {
    console.log('Hello there!');
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Start Here!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
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
    alignItems: "flex-end"
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
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#00000000",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff00"
  },
  exitButton: {
    marginTop: 10,
    alignSelf: "center",
    width: 100
  },
  UIButton: {
    width: 80,
    height: 80,
    paddingTop: 5,
    // paddingBottom: 20,
    // marginTop: 10,
    // marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black"
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 25
    // marginLeft: 33
  },
  mainButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
    marginTop: 18
  },
  MainButton: {
    width: 80,
    height: 80,
    paddingTop: 5,
    // paddingBottom: 20,
    // marginTop: 10,
    // marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black"
  }
});

module.exports = App;
