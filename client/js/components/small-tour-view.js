import React, { Component } from "react";
import { Text, ListItem, Left, Right } from "native-base";
import { connect } from "react-redux";

//bring in Tour DB Data

export default class SmallTour extends Component {
  render() {
    return (
      <ListItem>
        <Left>
          <Text>Tour Name</Text>
        </Left>
        <Right>
          <Text>></Text>
        </Right>
      </ListItem>
    );
  }
}
