import React, { Component } from "react";
import { Text, ListItem, Left, Right } from "native-base";
import { connect } from "react-redux";
import BigTour from "./big-tour-view";

//bring in Tour DB Data

export default class SmallTour extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <ListItem onClick={console.log("hello")}>
        <Left>
          <Text>{this.props.name}</Text>
        </Left>
        <Right>
          <Text>></Text>
        </Right>
      </ListItem>
    );
  }
}
