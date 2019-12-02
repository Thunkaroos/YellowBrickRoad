import React from "react";
import { StyleSheet } from "react-native";
import { View, Header, Left, Body, Text, Right, Button, List, Content } from "native-base";
import TourTabItem from "./tour-tab-item";



export const Profile = (props) => {
    const user = props.user;

    console.log('------------%%%%%%%%%', props)
    return (
      
        <View>
            <Header>
            <Text>Your Tours</Text>
                <Left/>
                <Body>
                    <Text>Welcome Back {user.email}</Text>
                </Body>
                <Right />   
            </Header>    
            <List > 
              {props.tours.filter(tour => tour.userId === user.id).map(tour => <TourTabItem key={tour.id} tour = {tour} getTour = {props.getTour} tabHandler = {props.tabHandler}/>)}
            </List>
            <Button transparent style={styles.loginButton} onPress = {props.logout}>
                <Text>Logout</Text>
            </Button>
        </View>
    )
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
