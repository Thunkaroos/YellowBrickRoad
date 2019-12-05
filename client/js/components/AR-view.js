import React, { Component } from "react";

import { Text, View, StyleSheet } from "react-native";
import { Button, Header } from "native-base";
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  user: state.user.user
})

class unconnectedARView extends Component {

  render() {
    console.log('The props are ----->', this);

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
        <Header style={styles.header}>
          <Text style={styles.headerText}>Create your own Tour</Text>
          <Text></Text>
        </Header>
        {errorMessage}
        <Button
          style={styles.button}
          onPress={ (this.props.user) ? this.props._getExperienceButtonOnPress(this.props.AR_EDITOR_TYPE) : console.log('Not logged in!')
          }
        >
          <View>
            <Text style={styles.buttonText}>Tour Editor</Text>
          </View>
        </Button>
      </View>
    );
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
  error: {
    alignSelf: "center",
  }
});
