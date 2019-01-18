# React Bootstrap test
This React project was started while reading "Beginning React" (packtpubs.com)
it uses Parcel and that's not in the book so I needed a sample for testing ideas.

Then I moved on to chapter 11 of "React and React Native".

The app is for a fictitious company called the Pigeon Messenger Service.

In this project, I started with my 'react-test' project and then
I added more React code,
I added code to do a fetch from a remote server (now using Axios!),
and I added some glitzy Bootstrap 4 components using reactstrap.

## Map components

I added some mocked components to test passing values
between parent and child components.

An OpenLayers "Map" has a bunch of things nested inside it, including Layers and Controls. A Layer (parent) has one Source (child) but the Layer has to call setSource with the source as a parameter. So I wrote some code here to simulate this.

## Bootstrap 4 via reactstrap

To get Bootstrap 4 working I needed
```npm install reactstrap bootstrap```

The bootstrap package is only needed for styles.

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
The page will reload if you make edits.
It should open automatically in a browser; if not the URL is [http://localhost:1234](http://localhost:1234)

When you edit the files, the browser copy should update automatically too as long as you leave the
Parcel server running.

You will also see any lint errors in the console; check for additional runtime errors in the browser debugger (usually opened with the F12 key).

### Deployment
To deploy, first run the build command: `npm run build`

Output will be in the `build` folder. Parcel bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed; copy everything in `build` to your server.

The first time you do `npm run build` the cssnano package will be installed, it does the minification.

## Learn More
To learn React, check out the [React documentation](https://reactjs.org/).

As mentioned above, see the books "Beginning React".
and "React and React Native", Chapter 11: Mobile-First React Components; it uses react-bootstrap not reactstrap but it's close.

Neither book uses Parcel.
