import React, { Component } from "react";
import { Text, ListItem, Left, Right } from "native-base";
import { connect } from "react-redux";

const TourTabItem = (props) => {
  const tour = props.tour;
  const getTour = props.getTour;
    return (    
      <ListItem onPress={() => {
        props.getTour(props.tour.id)
        if (props.tabHandler){
          props.tabHandler()
        }
      }}>

        <Left>
          <Text>{props.tour.name}</Text>
        </Left>
        <Right>
          <Text>>></Text>
        </Right>
      </ListItem>
    )
}

export default TourTabItem


// const onPressHandler = (props) => {
// return (props.getTour(props.tour.id), props.tabHandler())
// }


// props.getTour(props.tour.id)