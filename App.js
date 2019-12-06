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
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  Image
} from "react-native";
import { Container, Tabs, Tab, TabHeading, Header, Button } from "native-base";
import { Overlay } from "react-native-elements";
import { ViroARSceneNavigator } from "react-viro";
import AuthForm from "./client/js/components/auth-form";
import Tourform from "./client/js/components/tour-form";
import ARView from "./client/js/components/AR-view";
import TourView from "./client/js/components/tours-view";
import { dropPoint, undoPoint } from "./client/js/store/points.js";

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "API_KEY_HERE"
};

// Sets the default scene you want for AR and VR
var InitialARScene = require("./client/js/HelloWorldSceneAR");
var InitialARSceneEditor = require("./client/js/AR-Editor");

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";
var AR_EDITOR_TYPE = "AREditor";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

console.disableYellowBox = true;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      page: 1,
      tourId: "",
      isVisible: false
    };

    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getAREditor = this._getAREditor.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
    this.tabHandler = this.tabHandler.bind(this);
    this._endButtonHandler = this._endButtonHandler.bind(this);
    this._XButtonHandler = this._XButtonHandler.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
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
          <Tabs page={this.state.page}>
            <Tab
              heading={
                <TabHeading style={styles.header}>
                  <Text>Profile</Text>
                </TabHeading>
              }
            >
              <AuthForm tabHandler={this.tabHandler} />
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
        <View style={styles.backButtonPosition}>
          <TouchableHighlight
            onPress={() => this._exitViro()}
            style={styles.buttons}
            underlayColor={"#00000000"}
          >
            <Image source={require("./client/js/res/icon_left.png")} />
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
          <View>
            <Overlay isVisible={this.state.isVisible}>
              <Tourform
                closeOverlay={this._XButtonHandler}
                exitViro={this._exitViro}
              />
              {/* <View style={styles.menu}>
                <Form>
                  <View style={styles.Form}>
                    <Item floatingLabel>
                      <Input
                        placeholder="Tour Name"
                        name="tourName"
                        value={this.state.tourName}
                        onChangeText={value =>
                          this._handleChange("tourName", value)
                        }
                      />
                    </Item>
                    <Item floatingLabel>
                      <Input
                        placeholder="Description"
                        name="description"
                        value={this.state.description}
                        onChangeText={value =>
                          this._handleChange("description", value)
                        }
                      />
                    </Item>
                    <Button
                      style={styles.loginButton}
                      onPress={this._handleSubmit}
                    >
                      <Text style={styles.SubmitbuttonText}>Submit</Text>
                    </Button>
                  </View>
                  <Button
                    transparent
                    style={styles.XButton}
                    onPress={this.handleSubmit}
                    onPress={() => this._XButtonHandler()}
                  >
                    <Text style={styles.XButtonText}>X</Text>
                  </Button>
                </Form>
              </View> */}
            </Overlay>
          </View>
          <View style={styles.backButtonPosition}>
            <TouchableHighlight
              onPress={() => this._exitViro()}
              style={styles.buttons}
              underlayColor={"#00000000"}
            >
              <Image source={require("./client/js/res/icon_left.png")} />
            </TouchableHighlight>
          </View>
          <View style={styles.undoButtonPosition}>
            <TouchableHighlight
              onPress={e => {
                if (store.getState().points.pointCount > 1) {
                  store.dispatch(undoPoint());
                }
              }}
              style={styles.buttons}
              underlayColor={"#00000000"}
            >
              <Image source={require("./client/js/res/icon_repeat.png")} />
            </TouchableHighlight>
          </View>
          {/* <View style={styles.startButtonPosition}>
            <TouchableHighlight
              style={styles.UIButton}
              underlayColor={"#00000000"}
              onTrackingUpdated={this._onInitialized}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableHighlight>
          </View> */}
          <View style={styles.stopButtonPositon}>
            <Button
              style={styles.UIButton}
              underlayColor={"#00000000"}
              onPress={() => this._endButtonHandler()}
            >
              <Text style={styles.buttonText}>End</Text>
            </Button>
          </View>
          <View style={styles.dropButtonPosition}>
            <TouchableHighlight
              onPress={e => store.dispatch(dropPoint())}
              style={styles.MainButton}
              underlayColor={"#00000000"}
            >
              <Text style={styles.mainButtonText}>Drop</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Provider>
    );
  }

  tabHandler() {
    this.setState({
      page: 2
    });
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

  //closes overlay and returns to AREditor
  _XButtonHandler() {
    this.setState({
      isVisible: false
    });
  }

  //Opens tour-form-overlay in AREditor
  _endButtonHandler() {
    this.setState({
      isVisible: true
    });
  }
}

var styles = StyleSheet.create({
  backButtonPosition: {
    position: "absolute",
    left: -10,
    right: 0,
    top: 10,
    alignItems: "flex-start"
  },
  undoButtonPosition: {
    position: "absolute",
    left: 100,
    right: 0,
    top: 45,
    alignItems: "flex-end"
  },
  startButtonPosition: {
    position: "absolute",
    left: 10,
    right: 0,
    bottom: 20,
    alignItems: "baseline"
  },
  stopButtonPositon: {
    position: "absolute",
    left: 0,
    right: 15,
    bottom: 20,
    alignItems: "flex-end"
  },
  dropButtonPosition: {
    position: "absolute",
    left: 100,
    right: 100,
    bottom: 20,
    alignItems: "center"
  },
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
    marginTop: 15,
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
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15
  },
  TopUIButton: {
    width: 80,
    height: 40,
    paddingTop: 5,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 40
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20
  },
  mainButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 25,
    marginTop: 18,
    fontWeight: "bold"
  },
  MainButton: {
    width: 80,
    height: 80,
    paddingTop: 5,
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "black"
  },
  Form: {
    marginTop: 70
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 22,
    fontWeight: "bold"
  }
});

module.exports = App;
