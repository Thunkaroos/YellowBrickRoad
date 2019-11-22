const { db } = require("./server/db");
const { green, red } = require("chalk");

//require models here:
const User = require("./server/db/models/User");

//make seed data here:
const users = [
  {
    email: "user@email.com",
    password: "12345"
  },
  { email: "user2@email.com", password: "12345" }
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(user => {
        return User.create(user);
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
