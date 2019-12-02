import React, { Component } from "react";
import { Container, Header, Content, List, Text } from "native-base";
import TourTabItem from "./tour-tab-item";
import IndividualTourView from "./individual-tour-view";
import { connect } from "react-redux";
import { getAllTours, getTour, deselectTour } from "../store/tour";

export default connect(
  state => ({
    tours: state.tours.tours,
    selectedTour: state.tours.selectedTour
  }),
  dispatch => ({
    getAllTours: () => dispatch(getAllTours()),
    getTour: id => dispatch(getTour(id)),
    deselectTour: () => dispatch(deselectTour())
  })
)(
  class TourView extends Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.props.getAllTours();
    }

    render() {
      return (
        <Container>
          {this.props.selectedTour && this.props.selectedTour.id ? (
            <IndividualTourView
              tour={this.props.selectedTour}
              deselectTour={this.props.deselectTour}
              _getARNavigator={this.props._getARNavigator}
              AR_NAVIGATOR_TYPE={this.props.AR_NAVIGATOR_TYPE}
            />
          ) : (
            <Content>
              <List>
                {this.props.tours.map(tour => (
                  <TourTabItem
                    key={tour.id}
                    tour={tour}
                    getTour={this.props.getTour}
                  />
                ))}
              </List>
            </Content>
          )}
        </Container>
      );
    }
  }
);
