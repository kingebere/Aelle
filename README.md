# Aella Assessment

This is a job interview for Aella .

[My Github Account](https://github.com/kingebere) :point_left:

## Getting started

```

cd Aella
npm install
npm start
for linting , npm run lint
for linting fix , npm run lint:fix
for test , run npm test , please press a to run all test if you encounter an issue

```

## Built with

- [React](https://reactjs.org/)

## Things achieved

- Web application using the Starwars API

## Issues faces

- Lack of Id in the API .This is the first time I have seen such endpoints. Well, a first time for everything.
- Missing objects in the array . For example , an object with a url of the value "https://swapi.dev/api/people/18/" is preceded by an object with a url of the value "https://swapi.dev/api/people/16/". Thus , even using their individual indexes makes it impossible to get a correct routing id . The best solution I thought of was to grab the numbers from their url values and attach them to the array . Eureka!! It worked .

## Things to do once I fix my laptop

- Create custom hooks for all the identical functions littering around
- SASS
- Use better BEM principles
  -Add a back button using useLocation and attach it to the pages (using Absolute positioning,top: 0 , right:20px ) . Use an icon in a circle background(border-radius:50%,height:24px;width:24px)
  -Understand react query better . Is it better than redux?.Hmmm
  -Glowing blue and red css effect (css box-shadow) to signify Star wars sabers. Use as absolute positioning,z-index:1.
  -All of a sudden , eslint decided not to work with the application again . (To be fixed)
