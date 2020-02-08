# Yellow Brick Road



## A mobile app for creating and experiencing tours in Augmented Reality


  Hello! Welcome to Yellow Brick Road. Yellow Brick Road is a mobile application that allows users to create, share, and experience tours in Augmented Reality. 
  
  Instead of showing users dierctions on a map, Yellow Brick road presents users a 3D line of markers in the environment (viewed through the user's device) that they can follow from point to point. The app relies on the relative position of the users's camera for tracking, rather than GPS. This allows it to succeed in spaces where other navigation apps do not, such as indoors or underground areas. 
  
  Future updates will allow for increased interactivity within a given tour, such as helpful animations or modals that provide landmark descriptions.

  Please click the picture below for a brief presentation and demonstration of the app, or scroll down for more information. Thanks for looking!


  [![YellowBrickRoad Presentation Video](https://img.youtube.com/vi/qAMLpsmQKNo/0.jpg)](https://www.youtube.com/watch?v=qAMLpsmQKNo "YellowBrickRoad Presentation Video")


### MVP Goals:


- Create an app that provides guided tours/directions in AR
- Allow users to create their own tours and add descriptions/relevant metadata
- Users can browse and check out uploaded tours
- Users can initialize and follow their selected tour

### Stretch Goals


- Allow users to take and upload "start here" images for each tour
- Directions for subways, streets, and museums
- Google maps integration
- Add support for informational modals, animated prompts

### Tech Stack


- React Native
  - Mobile Framework we used in order to develop concurrently for IOS and Android

- ViroReact
  - Platform that utilizes Apple's ARKit or Android's ARCore to implement AR functionality such as tracking users and displaying tour points

- Native Base
  - UI library for React Native for creating menus, buttons, etc.

- Node.js & Express
  - We created an Express server to handle requests from the mobile app and serve the appropriate data from our database

- PostgreSQL
  - Relational database for storing user created tours and directions
