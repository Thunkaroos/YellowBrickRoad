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
  Body
} from "native-base";

export default class BigTour extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text>Tour Name</Text>
                  <Text note>Date Created</Text>{" "}
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {/* Insert Refrence Image for start point here */}
                <Image
                  source={{ uri: "Image URL" }}
                  style={{ height: 200, width: 200, flex: 1 }}
                />
                <Text>Tour Description Here</Text>
              </Body>
            </CardItem>
            {/* <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem> */}
          </Card>
        </Content>
      </Container>
    );
  }
}
