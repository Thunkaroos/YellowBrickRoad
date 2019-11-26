import React, { Component } from "react";
import { Container, Header, Content, List } from "native-base";
import SmallTour from "./small-tour-view";

//Map SmallTours

export default class TourView extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <SmallTour />
          </List>
        </Content>
      </Container>
    );
  }
}
