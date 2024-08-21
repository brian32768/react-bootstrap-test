# React Bootstrap test

This React 18 project was started while reading "Beginning React" (packtpubs.com)
It uses Parcel and that's not in the book so I needed a sample for testing ideas.

Then I moved on to chapter 11 of "React and React Native".

Today it's chapter 11 "Introducing Hooks" from "Beginning ReactJS Foundations".

As the project became more complex, I started doing smaller apps here. I list them here in order of complexity.

## react-simply/

This app is intentionally simple. It has a navbar and uses simple React Routing and React Bootstrap. It's getting more complex as I am adding a form to it!

It whines about not liking versoin 18 of React but then it runs anyway? Weird.

See Chapter 12 in "Beginning ReactJS Foundations" and also
https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/

## react-redux-first/

This sample use react-first-router and react-bootstrap.
## pigeon-messenger-service/

FIXME - this sample is broken, stuck somewhere in an upgrade nightmare.
The whole redux router thing is confusing and I am not convinced I need it right now.

In this sample, I started with my 'react-test' project and then
I added more React code, I added code to do a fetch from a remote server,
and I added some glitzy Bootstrap components.

I briefly added an OpenLayers map, but realized I was getting carried
away so it's been removed. Likewise I had added a react-bootstrap-table-next sample that's gone now. 
I want to be able to use this project
as a template and not every project I create has an OL map or a table in it!

I removed "" because it was pulling in corejs 2 giving me this warning.
"Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js."

## Redux

2019-January or so

I've added Redux. Open the console and watch log messages.
I added the Tasks menu which maintains a list of tasks.

There are actions and reducers in src/redux.

Redux implements a finite state machine. You tell it you want it to do something by dispatching an action
and that fires a reducer, which looks at the current state and possibly transitions to a new state. React components can watch the state and re-render if it changes. A store in redux is used to contain the entire state for your app.

## Bootstrap

I initially used reactstrap, because it was running at Bootstrap 4 and react-bootstrap was version 3.
I have switched back to react-bootstrap because it is now up to date at Bootstrap 5.1.

To get Bootstrap working I needed

   npm add react-bootstrap


Bootstrap React Component tests

* about.js and contact.js test the Card container.
* about.js and App.js demonstrate use of context (see ThemeContext)
* home.js tests the Navbar
* pictures.js tests the Carousel container.

## Development

In the project directory, `npm start`
will run the app in the development mode.
The page will reload as you make edits.
It should open automatically in a browser; if not the URL is [http://localhost:1234](http://localhost:1234)

When you edit the files, the browser copy should update automatically too as long as you leave the Parcel server running.

You will also see any lint errors in the console; check for additional runtime errors in the browser debugger (opened with the F12 key).

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

"Beginning ReactJS Foundations" (Chris Minnick)
is the book I am reading now.

As mentioned above, see the books "Beginning React" and 
"React and React Native", Chapter 11: Mobile-First React Components.

None of these books uses Parcel. Boo!





        "actions": "^1.3.0",
        "babel-polyfill": "^6.26.0",
        "classnames": "^2.2.5",
        "core-js": "^3.4",
        "deepmerge": "^3.3.0",
        "lodash.set": "^4.3.2",
        "markup-js": "^1.5.21",
        "prop-types": "^15.0.0",
        "query": "^0.2.0",
        "query-string": "^6.8.2",
        "rc-slider": "^8.6.12",
        "react": "^18.0",
        "react-bootstrap": "^2.3.0",
        "react-copy-to-clipboard": "^5.0.1",
        "react-dom": "^18.0",
        "react-redux": "^8.0.1",
        "react-select": "^4.1.0",
        "react-table": "^6.10.0",
        "react-transition-group": "^4.4.1",
        "redux": "^4.0.5",
        "redux-first-router": "^2.1.3",
        "redux-first-router-link": "^2.1.1",
        "redux-logger": "^3.0.6",
        "redux-persist": "^5.10.0",
        "shortid": "^2.2.14",
        "underscore": "^1.13.2"

