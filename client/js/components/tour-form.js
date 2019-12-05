import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  Button,
  Form,
  Input,
  Item,
} from "native-base";
import { connect } from "react-redux";


export default connect(
  state => ({ user: state.user.user }),
  dispatch => ({})
)(
  class AuthForm extends Component {
    constructor() {
      super();
      this.state = {
        tourName: "",
        description: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(tourName, value) {
      this.setState({
        [name]: value
      });
    }

    async handleSubmit() {
      const tourName = this.state.tourName;
      const description = this.state.description;
      //thunk here
    }

    render() {
      return (
        <View style={styles.menu}>
          <Form style={styles.Form}>
            <Item>
              <Input
                placeholder="Tour Name"
                name="tourName"
                value={this.state.tourName}
                onChangeText={value => this.handleChange("tourName", value)}
              />
            </Item>
            <Item>
              <Input
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChangeText={value => this.handleChange("description", value)}
              />
            </Item>
            <Button style={styles.loginButton} onPress={this.handleSubmit}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </View>
      );
    }
  }
);

var styles = StyleSheet.create({
  Form: {
    marginTop: 50
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 25
  },
  buttonTwoText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 20
  },
  loginButton: {
    marginTop: 10,
    alignSelf: "center",
    width: 100
  }
});
