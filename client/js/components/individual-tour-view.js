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
  FooterTab
} from "native-base";

const IndividualTourView = props => {
  console.log("The props are .....", props);
  return (
    <Container>
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Body>
                <Text>{props.tour.name}</Text>
                <Text note>Created: {props.tour.createdAt.slice(0, 10)}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              {/* <Image
                source={props.tour.startIm}
                style={{ height: 200, width: 200, flex: 1 }}
              /> */}
              <Text>{props.tour.description}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={() => props.deselectTour()}>
            <Text>Back to All Tours</Text>
          </Button>
          <Button onPress={() => props._getARNavigator()}>
            <Text>Start Tour</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default IndividualTourView;
