// import React, { Component } from "react";
// import { Container, Header, Content, List } from "native-base";
// import SmallTour from "./small-tour-view";
// import { connect } from "react-redux";
// import { getAllTours } from "../store/product";

// export default connect(
//   state => ({ products: state.tours, user: state.user }),
//   dispatch => ({ getAllTours: () => dispatch(getAllTours()) })
// )(
//   class TourView extends Component {
//     componentDidMount() {
//       this.props.getAllTours();
//     }

//     render() {
//       return (
//         <Container>
//           <Content>
//             <List>
//               {this.props.tours.map(tour => (
//                 <SmallTour key={tour.id} {...tour} />
//               ))}
//             </List>
//           </Content>
//         </Container>
//       );
//     }
//   }
// );
