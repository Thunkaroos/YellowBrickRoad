import React, { Component } from "react";

import { Text, View, StyleSheet } from "react-native";
import { Button, Header } from "native-base";
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
            onPress={this.props._getExperienceButtonOnPress(this.props.AR_EDITOR_TYPE)}
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
  _endButtonHandler() {
    this.setState({
      isVisible: true
    });
  }

  _handleSubmit() {
    const tourName = this.state.tourName;
    const description = this.state.description;
    //thunk here
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
