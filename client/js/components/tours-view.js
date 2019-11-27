import React, { Component } from "react";
import { Container, Header, Content, List, Text } from "native-base";
import SmallTour from "./small-tour-view";
import { connect } from "react-redux";
import { getAllTours, getTour } from "../store/tour";

export default connect(
  state => ({ 
    tours: state.tours.tours,
    selectedTour: state.tours.selectedTour
  }),
  dispatch => ({ 
    getAllTours: () => dispatch(getAllTours()),
    getTour: (id) => dispatch(getTour(id))
  })
)(
  class TourView extends Component {
    constructor(props){
      super(props)
    }
    componentDidMount() {
      this.props.getAllTours();
    }

    render() {
      return (
        <Container>
          <Content>
            <List>
              {this.props.tours.map(tour => (
                <SmallTour key={tour.id} tour = {tour} getTour = {this.props.getTour} />
              ))}
            </List>
          </Content>
        </Container>
      );
    }
  }
);
