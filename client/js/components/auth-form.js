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
  Content
} from "native-base";

import axios from 'axios';




export default class AuthForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      user: {},
      error: '',
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

      await axios.post(`http://172.16.22.47:3000/auth/${method}`, {email, password})
      .then((user) => {
        this.setState({
          user: user.data,
        })
      })
      .catch((error) => {
        this.setState({
          error: error.response.data
        })
      });   
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

    if (this.state.error) {
      errorMessage = (
        <Text>Error: {this.state.error}</Text>
      )
    }
    else {
      errorMessage = null;
    }
        
    return (
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
