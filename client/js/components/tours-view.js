import React, { Component } from "react";
import { Container, Header, Content, List } from "native-base";
import SmallTour from "./small-tour-view";
import { connect } from "react-redux";
import { getAllTours } from "../store/tour";

export default connect(
  state => ({ tours: state.tours}),
  dispatch => ({ getAllTours: () => dispatch(getAllTours()) })
)(
  class TourView extends Component {
    constructor(props){
      super(props)
    }
    componentDidMount() {
      this.props.getAllTours();
    }

    render() {
      console.log(this.props)
      return (
        <Container>
          <Text>Hello!</Text>
          <Content>
            <List>
              {this.props.tours.map(tour => (
                <SmallTour key={tour.id} {...tour} />
              ))}
            </List>
          </Content>
        </Container>
      );
    }
  }
);
