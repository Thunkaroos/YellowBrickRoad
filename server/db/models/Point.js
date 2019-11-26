const Sequelize = require("sequelize");
const db = require("../database");

const Point = db.define("point", {
  stepNum: {
    type: Sequelize.INTEGER
  },
  x: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  y: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  z: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
});

// Point.orderTourPoints = (tourId) => {
//   const tourPoints = this.findAll({
//     where: {
//       tourId
//     }
//   })
//   let orderedPoints = tourPoints.sort((a, b) => a.stepNum - b.stepNum)
//                             .map(tour => [Number(tour.x), Number(tour.y), Number(tour.z)])
  
//   return orderedPoints
// }

module.exports = Point;
