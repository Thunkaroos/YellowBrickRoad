import React from "react";
import { StyleSheet } from "react-native";
import { View, Header, Left, Body, Text, Right, Button } from "native-base";

export const Profile = (props) => {
    const user = props.user;
    console.log('Am I here');
    return (
        <View>
            <Header>
                <Left/>
                <Body>
                    <Text>Welcome Back {user.email}</Text>
                </Body>
                <Right />
            </Header>
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
