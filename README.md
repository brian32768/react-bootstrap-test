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

I've added Redux and real maps. Open the console and watch log messages.
First I added the Tasks menu which maintains a list of tasks. Then I added
OpenStreetMap and implemented storing the current map extent and the bookmarks features.
It does not remember is as history but it does save the extent
so that if you flip to another page in the menu (say Table) and come back it restores the location.

There are actions and reducers in src/redux.

Redux implements a finite state machine. You tell it you want it to do something by dispatching an action
and that fires a reducer, which looks at the current state and possibly transitions to a new state. React components can watch the state and re-render if it changes. A store in redux is used to contain the entire state for your app.

### Implementing "History" aka "Time Travel"

Use case: I want to set up a view of a map and send it to a friend as a (relatively short) link.

Use case: I want to set up a view, leave for the weekend, and come back to it on Monday.

Use case: Bookmark a map view

The way to implement this seems to be via connected-react-router.
Adding ````npm install connected-react-router```` pulls in the required dependencies (including "history").

### Maps

Initially I added some mocked components to test passing values between parent and child components that simulated maps. Then I realized that my ol-react makes adding a real map so easy that I added it to this project and now I can use OpenStreetMap instead of mocking.

Map Extent: I use Redux to store the map extent, and the extent is passed to the OpenLayers View. When you go to another page and then come back, the state of the extent from redux is passed to the OL view so the map does not go back to its initial extent.

Markers: You can add markers to the map by clicking on it. The markers go away if you reload the page.

I am using OpenLayers 6 beta.

## Bootstrap 4 via Reactstrap

To get Bootstrap 4 working I needed
```npm install reactstrap bootstrap```

The bootstrap package is only needed for its CSS, so ignore warnings.

Refer to http://reactstrap.github.io/ for more information on reactstrap.

Bootstrap React Component tests
* about.js and contact.js test the Card container.
* about.js and App.js demonstrate use of context (see ThemeContext)
* home.js tests the Navbar
* pictures.js tests the Carousel container.

## Available Scripts

### Development
In the project directory, `npm start`
will run the app in the development mode.
The page will reload as you make edits.
It should open automatically in a browser; if not the URL is [http://localhost:1234](http://localhost:1234)

When you edit the files, the browser copy should update automatically too as long as you leave the Parcel server running.

You will also see any lint errors in the console; check for additional runtime errors in the browser debugger (opened with the F12 key).

## Learn More
To learn React, check out the [React documentation](https://reactjs.org/).

As mentioned above, see the books "Beginning React".
and "React and React Native", Chapter 11: Mobile-First React Components; it uses react-bootstrap not reactstrap but it's close.

Neither book uses Parcel.
