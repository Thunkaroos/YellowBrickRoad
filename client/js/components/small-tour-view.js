import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  ListItem
} from "native-base";
import { connect } from "react-redux";

//bring in Tour DB Data

export default class SmallTour extends Component {
  render() {
    return (
      <ListItem>
        <Text>Tour Name</Text>
      </ListItem>
    );
  }
}
