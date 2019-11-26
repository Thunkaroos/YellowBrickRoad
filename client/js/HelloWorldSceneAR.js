"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { Button } from "native-base";

import {
  ViroNode,
  ViroPolyline,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroButton,
  ViroARPlaneSelector,
  ViroMaterials
} from "react-viro";
import axios from 'axios'
//import console from "console";

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      dataPoints: [
        [0,0,-1]
      ]
    };



    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonGaze = this._onButtonGaze.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
  }

  componentDidMount() {
    this.getTourData(1) //<---- Hardcoded!! change this!
  }

  async getTourData(id) {
    try {
      const {data} = await axios.get(`http://172.16.22.28:3000/api/points/${id}`) //<--- change for deployment
      this.setState({
        dataPoints: data
      })
    } catch (error) {
      console.log(error)
    }
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
        <ViroNode>
          <ViroPolyline
            dragType="FixedToWorld"
            onDrag={() => {}}
            position={[0, 0, -2]}
            points={this.state.dataPoints}
            thickness={0.2}
            materials={["brick"]}
          />
        </ViroNode>
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
    console.log("Start Here!");
    this.props.onExitViro();
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Start Here!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

ViroMaterials.createMaterials({
  brick: {
    // roughness: 0.7,
    // metalness: 0.3,
    // lightingModel: "PBR",
    diffuseColor: "yellow"
    // diffuseTexture: require('../assets/1K-brick_wall_white-diffuse.jpg')
  }
});

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
