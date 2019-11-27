import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  StatusBar
} from "react-native";
import {
  Container,
  Tabs,
  Tab,
  TabHeading,
  Spinner,
  Header,
  Icon,
  Button,
  Form,
  Label,
  Input,
  Item,
  Content,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import { connect } from "react-redux";
import { auth, logoutUser } from "../store/user";
import { Profile } from "./profile";

import axios from 'axios';

export default connect(
  state => ({ user: state.user.user }),
  dispatch => ({ 
    getUser: (email, password, method) => dispatch(auth(email, password, method)),
    logoutUser: () => dispatch(logoutUser())            
  })
)(
  class AuthForm extends Component {
    constructor() {
      super()
      this.state = {
        email: '',
        password: '',
        primaryForm: 'Login',
        secondaryForm: 'Sign Up',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.changeForm = this.changeForm.bind(this);
    }

    handleChange(name, value) {
      this.setState({
        [name]: value
      })
    }

    async handleSubmit(e) {

        const method = (this.state.primaryForm === 'Login') ? 'login' : 'signup';

        const email = this.state.email;
        const password = this.state.password;

        this.props.getUser(email, password, method) 
    }

    changeForm() {
      if (this.state.primaryForm === 'Login') {
        this.setState({
          primaryForm: 'Sign Up',
          secondaryForm: 'Login',
        });
      }
      else {
        this.setState({
          primaryForm: 'Login',
          secondaryForm: 'Sign Up',
        })
      }
    }

    render() {

      let errorMessage;

      if (this.props.user && this.props.user.error) {
        errorMessage = (
          <Text>Error: {this.props.user.error.response.data}</Text>
        )
      }
      else {
        errorMessage = null;
      }
          
      return (
        (this.props.user && this.props.user.email) ? 
          <Profile user = {this.props.user} logout = {this.props.logoutUser} />
          :
          <View style={styles.menu}>
            {errorMessage}
            <Form style={styles.Form}>
              <Item>
                <Input placeholder="Email" name = 'email' value = {this.state.email} onChangeText = {value => this.handleChange('email', value)} />
              </Item>
              <Item>
                <Input placeholder="Password" name = 'password' value = {this.state.password} onChangeText = {value => this.handleChange('password', value)} />
              </Item>
              <Button style={styles.loginButton} onPress = {this.handleSubmit}>
                <Text style={styles.buttonText}>{this.state.primaryForm}</Text>
              </Button>
              <Button transparent style={styles.loginButton} onPress = {this.changeForm}>
                <Text>{this.state.secondaryForm}</Text>
              </Button>
            </Form>
          </View>
      );
    }
  }
)

var styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 25
  },
  loginButton: {
    marginTop: 10,
    alignSelf: "center",
    width: 100
  },
});
