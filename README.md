# React Bootstrap test
This React project was started while reading "Beginning React" (packtpubs.com)
It uses Parcel and that's not in the book so I needed a sample for testing ideas.

Then I moved on to chapter 11 of "React and React Native".

The app is for a fictitious company called the Pigeon Messenger Service.

In this project, I started with my 'react-test' project and then
I added more React code,
I added code to do a fetch from a remote server (now using Axios!),
and I added some glitzy Bootstrap 4 components using reactstrap.

## Redux

2019-January or so

I've added Redux. Open the console and watch log messages.
I added the Tasks menu which maintains a list of tasks.

There are actions and reducers in src/redux.

Redux implements a finite state machine. You tell it you want it to do something by dispatching an action
and that fires a reducer, which looks at the current state and possibly transitions to a new state. React components can watch the state and re-render if it changes. A store in redux is used to contain the entire state for your app.
## Bootstrap 4 via Reactstrap

To get Bootstrap 4 working I needed
```yarn add reactstrap bootstrap```

The bootstrap package is only needed for its CSS, so ignore warnings. Eventually I got tired
of it crying about missing its jquery, so "yarn add jquery" for now, but soonish we'll be
getting a shiny new reactstrap built for Bootstrap 5 and when that happens we can kiss
jquery goodbye forever.

Refer to http://reactstrap.github.io/ for more information on reactstrap.

Bootstrap React Component tests

* about.js and contact.js test the Card container.
* about.js and App.js demonstrate use of context (see ThemeContext)
* home.js tests the Navbar
* pictures.js tests the Carousel container.

## Development

In the project directory, `yarn start`
will run the app in the development mode.
The page will reload as you make edits.
It should open automatically in a browser; if not the URL is [http://localhost:1234](http://localhost:1234)

When you edit the files, the browser copy should update automatically too as long as you leave the Parcel server running.

You will also see any lint errors in the console; check for additional runtime errors in the browser debugger (opened with the F12 key).

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

As mentioned above, see the books "Beginning React".
and "React and React Native", Chapter 11: Mobile-First React Components; it uses react-bootstrap not reactstrap but it's close.

Neither book uses Parcel. Boo!
