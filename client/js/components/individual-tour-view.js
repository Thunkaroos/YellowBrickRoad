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
  Footer,
  FooterTab,
} from "native-base";

const IndividualTourView = (props) => {
  console.log('The props are .....          Individual-tour-view   +++++++++++++++++ ', props);
  return (
    <Container>
      <Header />
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Body>
                <Text>Tour Name</Text>
                <Text note>Date Created</Text>
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
      <Footer>
          <FooterTab>
            <Button>
              <Text>Start Tour</Text>
            </Button>
            <Button onPress = {() => props.deselectTour()}>
              <Text>Back to All Tours</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
  )
}

export default IndividualTourView