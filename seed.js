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
    name: "Tour 1",
    description: "TEST OF TOUR 1",
    startImg:
      "http://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png"
  },
  {
    name: "Tour 2",
    description: "TEST OF TOUR 2",
    startImg:
      "http://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png"
  },
  {
    name: "Tour 3",
    description: "TEST OF TOUR 3",
    startImg:
      "http://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png"
  },
  {
    name: "Tour 4",
    description: "TEST OF TOUR 4",
    startImg:
      "http://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png"
  },
  {
    name: "Tour 5",
    description: "TEST OF TOUR 5",
    startImg:
      "http://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png"
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
    z: -9,
    tourId: 1
  },
  {
    stepNum: 3,
    x: 10,
    y: 0,
    z: -9,
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
    z: -9,
    tourId: 2
  },
  {
    stepNum: 3,
    x: 10,
    y: 0,
    z: -9,
    tourId: 2
  },
  {
    stepNum: 4,
    x: 10,
    y: 0,
    z: -15,
    tourId: 2
  }
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(user => {
        return User.create(user);
      }),
      tours.map(tour => {
        return Tour.create(tour);
      }),
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
