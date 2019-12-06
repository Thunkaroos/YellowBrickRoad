import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  Button,
  Form,
  Input,
  Item,
} from "native-base";
import { connect } from "react-redux";
import { postTour } from "../store/tour";
import { postPoints, resetPoints } from "../store/points";


export default connect(
  state => ({ 
      user: state.user.user,
      points: state.points.points,
    }),
  dispatch => ({
    postTour: (name, description, userId) => dispatch(postTour(name, description, userId)),
    postPoints: (point, stepNum, tourId) => dispatch(postPoints(point, stepNum, tourId)),
    resetPoints: () => dispatch(resetPoints())
  })
)(
  class Tourform extends Component {
    constructor() {
      super();
      this.state = {
        tourName: "",
        description: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(name, value) {
      this.setState({
        [name]: value
      });
    }

    async handleSubmit() {
        const name = this.state.tourName;
        const description = this.state.description;
        const userId = this.props.user.id;

        this.props.postTour(name, description, userId)
        .then((tour) => {
            
            this.props.points.forEach((points, idx) => {
                this.props.postPoints(points, idx + 1, tour.id);
            })
        })

        this.props.resetPoints();

        this.props.exitViro();

        this.props.closeOverlay();
    }


    render() {

      return (
        <View>
            <Form>
                <View style={styles.Form}>
                <Item floatingLabel>
                    <Input
                    placeholder="Tour Name"
                    name="tourName"
                    value={this.state.tourName}
                    onChangeText={value =>
                        this.handleChange("tourName", value)
                    }
                    />
                </Item>
                <Item floatingLabel>
                    <Input
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChangeText={value =>
                        this.handleChange("description", value)
                    }
                    />
                </Item>
                <Button
                    style={styles.loginButton}
                    onPress={this.handleSubmit}
                    disabled = {!this.state.tourName || !this.state.description}
                >
                    <Text style={styles.SubmitbuttonText}>Submit</Text>
                </Button>
                </View>
                <Button
                    transparent
                    style={styles.XButton}
                    onPress={this.props.closeOverlay}
                >
                <Text style={styles.XButtonText}>X</Text>
                </Button>
            </Form>
        </View>
      );
    }
  }
);

var styles = StyleSheet.create({
  Form: {
    marginTop: 50
  },
  SubmitbuttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 20
  },
  XButton: {
    position: "absolute",
    left: -10,
    right: 0,
    top: 10,
    alignItems: "flex-start",
    width: 40,
    height: 40,
    marginLeft: 10
  },
  XButtonText: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 25
  },
  loginButton: {
    marginTop: 25,
    alignSelf: "center",
    width: 100
  }
});
