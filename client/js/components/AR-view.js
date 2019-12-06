import React, { Component } from "react";

import { Text, View, StyleSheet } from "react-native";
import { Button, Header, Form } from "native-base";
import { connect } from 'react-redux'
import { Overlay } from "react-native-elements";


const mapStateToProps = state => ({
  user: state.user.user
})

class unconnectedARView extends Component {
  constructor(props){
    super(props)

    this.state = {
      isVisible: false
    }
  }

  render() {

    let errorMessage;

    if (this.props.user && this.props.user.id) {
      errorMessage = null;
    } else {
      errorMessage = (
        <Text style = {styles.error}>You must login/signup to create a Tour</Text>
      )
    }

    return (
      
      <View>
        <View>
            <Overlay isVisible={this.state.isVisible}>
              <View style={styles.menu}>
                <Button
                    transparent
                    style={styles.XButton}
                    onPress={() => this._XButtonHandler()}
                  >
                    <Text style={styles.XButtonText}>X</Text>
                </Button>
                <Text
                  style = {styles.overlayText}
                >   Make sure you're in the proper    
                       starting position
                
                </Text>
                <Form>
                  <View style={styles.Form}>
                    <Button
                      style={styles.startButton}
                      onPress={this.props._getExperienceButtonOnPress(this.props.AR_EDITOR_TYPE)}
                    >
                      <Text style={styles.startButtonText}>Start Editor</Text>
                    </Button>
                  </View>
                </Form>
              </View>
            </Overlay>
          </View>
        <Header style={styles.header}>
          <Text style={styles.headerText}>Create your own Tour</Text>
        </Header>
        {errorMessage}
        {(this.props.user && this.props.user.id) ? 
          <Button
            style={styles.button}
            onPress={() => this._toggleOverlay()}
          >
            <View>
              <Text style={styles.buttonText}>Tour Editor</Text>
            </View>
          </Button> :
          <Button disabled
            style={styles.button}
          >
            <View>
              <Text style={styles.buttonText}>Tour Editor</Text>
            </View>
          </Button>
        }
        
      </View>
    );
  }

  //closes overlay and returns to AREditor
  _XButtonHandler() {
    this.setState({
      isVisible: false
    });
  }

  //Opens tour-form-overlay in AREditor
  _toggleOverlay() {
    this.setState({
      isVisible: true
    });
  }
 
}

export default ARView = connect(mapStateToProps, null)(unconnectedARView)

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
  },
  XButtonText: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 25
  },
  overlayText: {
    marginTop: 80,
    textAlign: "center",
    fontSize: 18
  },
  startButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 20
    },
  startButton: {
    marginTop: 85,
    alignSelf: "center",
    width: 137
    }
  }
);
