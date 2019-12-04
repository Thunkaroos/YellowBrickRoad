import React, { Component } from "react";
import { Text, ListItem, Left, Right } from "native-base";
import { connect } from "react-redux";

const TourTabItem = props => {
  return (
    <ListItem
      onPress={() => {
        props.getTour(props.tour.id);
        if (props.tabHandler) {
          props.tabHandler();
        }
      }}
    >
      <Left>
        <Text>{props.tour.name}</Text>
      </Left>
      <Right>
        <Text>>></Text>
      </Right>
    </ListItem>
  );
};

export default TourTabItem;
