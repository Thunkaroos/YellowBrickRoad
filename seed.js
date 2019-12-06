const { db } = require("./server/db");
const { green, red } = require("chalk");

//require models here:
const User = require("./server/db/models/User");
const Tour = require("./server/db/models/Tour");
const Point = require("./server/db/models/Point");

//make seed data here:
const users = [
  {
    email: "user@email.com",
    password: "12345"
  },
  { email: "user2@email.com", password: "12345" }
];

const tours = [
  {
    name: "Python to Java",
    description:
      "A tour from the developers work area in Python to the Java Room",
    startImg: "https://i.imgur.com/jUdAds1.jpg",
    userId: 1
  },
  {
    name: "Python to Oasis",
    description: "A tour from the developers work area in Python to the Oasis",
    startImg: "https://i.imgur.com/jUdAds1.jpg",
    userId: 2
  },
  {
    name: "Friends & Family Tour",
    description: "Luxurious VIP tour EXPERIENCE of the Fullstack Academy Campus",
    startImg:
      "https://i.imgur.com/8P6qNnP.jpg",
    userId: 2
  }
];

const points = [
  {
    stepNum: 1,
    x: 0,
    y: 0,
    z: 0,
    tourId: 1
  },
  {
    stepNum: 2,
    x: 0,
    y: 0,
    z: -6.5,
    tourId: 1
  },
  {
    stepNum: 3,
    x: 10,
    y: 0,
    z: -6.5,
    tourId: 1
  },
  {
    stepNum: 1,
    x: 0,
    y: 0,
    z: 0,
    tourId: 2
  },
  {
    stepNum: 2,
    x: 0,
    y: 0,
    z: -6.5,
    tourId: 2
  },
  {
    stepNum: 3,
    x: 10,
    y: 0,
    z: -6.5,
    tourId: 2
  },
  {
    stepNum: 4,
    x: 10,
    y: 0,
    z: -13.5,
    tourId: 2
  },
  {
    stepNum: 1,
    x: 0.000,
    y: 0.000,
    z:-0.200,
    tourId: 3
  },
  {
    stepNum: 2,
    x: -1.103,
    y: 0.060,
    z: -17.132,
    tourId: 3
  },
  {
    stepNum: 3,
    x: 2.183,
    y: 0.028,
    z: -19.571,
    tourId: 3
  },
  {
    stepNum: 4,
    x: 14.749,
    y: 0.023,
    z: -21.459,
    tourId: 3
  },
  {
    stepNum: 5,
    x: 14.692,
    y: 0.030,
    z: -21.525,
    tourId: 3
  },
  {
    stepNum: 6,
    x: 15.441,
    y: -0.026,
    z: -8.258,
    tourId: 3
  },
  {
    stepNum: 7,
    x: 7.280,
    y: -0.047,
    z: -7.598,
    tourId: 3
  },
  {
    stepNum: 8,
    x: 8.240,
    y: -0.076,
    z: -0.302,
    tourId: 3
  },
  {
    stepNum: 9,
    x: -0.318,
    y: -0.031,
    z: -0.488,
    tourId: 3
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(user => {
        return User.create(user);
      })
    ),
      await Promise.all(
        tours.map(tour => {
          return Tour.create(tour);
        })
      ),
      await Promise.all(
        points.map(point => {
          return Point.create(point);
        })
      );

    // seed your database here!

    console.log(green("Seeding success!"));
    db.close();
  } catch (err) {
    console.error(red("Oh noes! Something went wrong!"));
    console.error(err);
    db.close();
  }
};
seed();
