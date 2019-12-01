
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  ViroARScene,
  ViroARPlane,
  ViroMaterials,
  ViroImage,
  ViroARPlaneSelector,
  ViroSurface,
  ViroConstants,
  ViroVideo,
  ViroText,
  ViroUtils,
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimatedImage,
  ViroAnimations,
} from 'react-viro';

import TimerMixin from 'react-timer-mixin';

var createReactClass = require('create-react-class');

let polarToCartesian = ViroUtils.polarToCartesian;

let planes = [];
let planesAdded = [];
var testARScene = createReactClass({
  mixins: [TimerMixin],
  componentWillMount() {
    this.numAnchors = 0;
    this.anchors = {};
  },
  getInitialState: function() {
    return {
      currentAnim: "moveToPos",
      addPlane1 : false,
      addPlane3 : true,
      minValue : 0,
      isAnimLooping: false,
      isAnimRunning: false,
      isObjectVisible:true,
    }
  },
  render: function() {
    return (
      <ViroARScene onAnchorFound={this._onSceneAnchorFound} >
        <ViroAmbientLight color="#ffffff" intensity={1000} />
        {this._getPlanes()}
        {/* {this._renderEmoji()} */}

        <ViroText position={polarToCartesian([2, 0, -20])} text={"No Callbackkkkkk"}
          style={styles.instructionText} transformBehaviors={["billboard"]}
          ref={component=>{this._callbackText = component}}/>

      </ViroARScene>
    );
  },

  _onSceneAnchorFound(anchor) {

    this.anchors[this.numAnchors] = anchor;
    planes.push(
      <ViroARPlane
        key={this.anchors[this.numAnchors].anchorId}
        anchorId={this.anchors[this.numAnchors].anchorId}
        // onClick={this._setTextNatively("onClick", this.numAnchors)}
        onAnchorFound={this._onAnchorFound}
        onAnchorUpdated={this._onAnchorUpdated}
        onAnchorRemoved={this._onAnchorRemoved} >

      <ViroSurface
        rotation={[-90, 0, 0]}
        scale={[.5,.5,1]}
        materials={"earth"}/>

    </ViroARPlane>);


    // this.numAnchors++;
    // this.setState({
    //   reloadFlag : !(this.state.reloadFlag),
    //   isObjectVisible: true,
    // }, () => {this._updateAnimation(this.anchors[this.numAnchors-1].position)})
  },

  //_renderEmoji() {
    // return (<Viro3DObject
    //       key="model"
    //       visible={this.state.isObjectVisible}
    //       position={[0, 0, 0]}
    //       scale={[0.2, 0.2, 0.2]}
    //       ref={(component)=>{this._animComponent=component}}
    //       source={require('./res/emoji_smile.vrx')}
    //       type = "VRX"
    //       animation={{name:this.state.currentAnim,
    //                   delay:0,
    //                   loop:this.state.isAnimLooping,
    //                   run:this.state.isAnimRunning,
    //                   }}
    //     />);

//     <ViroAnimatedImage
//     height={2}
//     width={2}
//     placeholderSource={require("./res/yellow_bricks_diff_8k.jpg")}
//     source={{uri:"./res/yellow_bricks_diff_8k.jpg"}}
//  />
  //},

  _getPlanes() {
    if(this.numAnchors === 0 || this.numAnchors === undefined) {
      return;
    }

    return planes;
  },

  _onAnchorFound(anchor) {

  },

  
//   _setTextNatively(callbackType, num) {
//     return ()=> {
//           this._updateAnimation(this.anchors[num].position);
//             this._callbackText.setNativeProps({"text" : "Callback: " + "index" + num  + "| " + this.anchors[num].position[0] + "," + this.anchors[num].position[1] + "," + this.anchors[num].position[2]})
//       }
//   },

//   _updateAnimation(position){
//     ViroAnimations.registerAnimations({
//       moveToPos:{properties:{positionX:position[0], positionY:position[1]+.2, positionZ:position[2]}, duration:1000, delay:0},
//     });
//     this._animComponent.setNativeProps({animation:{name:"moveToPos",
//                 delay:0,
//                 loop:false,
//                 run:true,
//                 }})


//   },
});

var styles = StyleSheet.create({
  instructionText: {
      fontFamily: 'Arial',
      fontSize: 10,
      color: '#cccccc',
      flex: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  blue_plane: {
    lightingModel: "Constant",
    diffuseColor: "#0000ff50"
  },
  red_plane: {
    lightingModel: "Constant",
    diffuseColor: "#ff000050"
  },
  green_plane: {
    lightingModel: "Constant",
    diffuseColor: "#00ff0050"
  },
  earth: {
    shininess: 2.0,
    lightingModel: "Lambert",
    diffuseTexture: require('./res/earth.jpeg'),
  },
  
});

ViroAnimations.registerAnimations({
  moveToPos:{properties:{positionX:0, positionY:0, positionZ:0}},
  moveRight:{properties:{positionX:"+=.5",}, duration:3000, delay:0},
  moveLeft:{properties:{positionX:"-=.5",}, duration:3000, delay:0},
  loopRotate:{properties:{rotateY:"+=180"}, duration:500},
  sequentialAnim:[
        ["moveRight","moveLeft"]
  ],
  parallelAnim:[
        ["moveRight","moveLeft"],
        ["loopRotate"]
  ],
});

module.exports = testARScene;