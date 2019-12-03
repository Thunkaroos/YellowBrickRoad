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
    dataPoints: state.points
  })

const mapDispatchToProps = dispatch => ({
  getAllTours: () => dispatch(getAllTours()),
  getTour: id => dispatch(getTour(id)),
  deselectTour: () => dispatch(deselectTour()),
  // addPoint: (point) => dispatch(addPoint(point))
})

// export default connect(
//   state => ({
//     tours: state.tours.tours,
//     selectedTour: state.tours.selectedTour
//   }),
//   dispatch => ({
//     getAllTours: () => dispatch(getAllTours()),
//     getTour: id => dispatch(getTour(id)),
//     deselectTour: () => dispatch(deselectTour())
//   })
// )
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
    // this.getTourData(1); //<---- Hardcoded!! change this!
    console.log('In the editor, this is ------->', this);
    // console.log('In the editor, the store is ----->', store);
  }

  async getTourData(id) {
    try {
      const { data } = await axios.get(
        `http://ar-guides.herokuapp.com/api/points/${id}`
      ); //<--- change for deployment
      this.setState({
        dataPoints: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log('The props dataPoints is ----->', this.props.dataPoints);
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
    console.log('The state is ----->', state);
    console.log('The reason is ----->', reason);
    console.log('The ViroConstants is ----->', ViroConstants);
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
