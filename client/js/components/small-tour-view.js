import React, { Component } from "react";
import { Text, ListItem, Left, Right } from "native-base";
import { connect } from "react-redux";
import BigTour from "./big-tour-view";

//bring in Tour DB Data

const SmallTour = (props) => {
  console.log('The props are ....', props);
  const tour = props.tour;
  const getTour = props.getTour;

    return (
      <ListItem onPress={() => props.getTour(props.tour.id)}>
        <Left>
          <Text>{props.tour.name}</Text>
        </Left>
        <Right>
          <Text>></Text>
        </Right>
      </ListItem>
    )
}

export default SmallTour
