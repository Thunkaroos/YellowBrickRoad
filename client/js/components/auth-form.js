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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(e) {
    // e.preventDefault();
      const email = this.state.email;
      const password = this.state.password;

      console.log('How about here?');

      await axios.post('http://172.16.22.47:3000/auth/login', {email, password})
      .then((user) => {
        console.log(user.data);
      })
      .catch((error) => {
        console.error(error);
      });

  
      
  }
  render() {
    return (
      <View style={styles.menu}>
        <Form style={styles.Form}>
          <Item>
            <Input placeholder="Email" name = 'email' value = {this.state.email} onChangeText = {value => this.handleChange('email', value)} />
          </Item>
          <Item>
            <Input placeholder="Password" name = 'password' value = {this.state.password} onChangeText = {value => this.handleChange('password', value)} />
          </Item>
          <Button style={styles.loginButton} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
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
  }
});
