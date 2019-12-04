"use strict";

import React, { Component } from "react";
import { connect } from 'react-redux';

import { StyleSheet } from "react-native";

import { Button } from "native-base";

import {
  ViroNode,
  ViroPolyline,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroButton,
  ViroARPlane,
  ViroMaterials
} from "react-viro";
import axios from "axios";


const mapStateToProps = state => ({
    tours: state.tours.tours,
    selectedTour: state.tours.selectedTour,
    points: state.points.points,
    pointCount: state.points.pointCount,
  })

const mapDispatchToProps = dispatch => ({
  getAllTours: () => dispatch(getAllTours()),
  getTour: id => dispatch(getTour(id)),
  deselectTour: () => dispatch(deselectTour())
  // addPoint: (point) => dispatch(addPoint(point))
})

export default class unconnectedAREditor extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      // dataPoints: [[0, 0, -1]]
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onButtonGaze = this._onButtonGaze.bind(this);
    this._onButtonTap = this._onButtonTap.bind(this);
  }

  componentDidMount() {
    console.log('In the editor, this is ------->', this);
  }

  componentDidUpdate(prevProps) {
    console.log('Check mate!');
    console.log('this.props.pointsCount is ----->', this.props.pointCount);
    console.log('prevProps.pointCount is ----->', prevProps.pointCount);
    if (this.props.pointCount >= prevProps.pointCount) {
      console.log('We have added a point!');
    }
  }

  async getTourData(id) {
    try {
      const { data } = await axios.get(
        `http://ar-guides.herokuapp.com/api/points/${id}`
      ); //<--- change for deployment
      this.setState({
        points: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log('The props are ----->', this.props);
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARPlane />
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
            points={this.props.dataPoints}
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
    diffuseColor: "yellow"
  }
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  },
  outer: {
    flex: 1
  },
  arView: {
    flex: 1
  }
});

const AREditor = connect(mapStateToProps, mapDispatchToProps)(unconnectedAREditor);
module.exports = AREditor;
