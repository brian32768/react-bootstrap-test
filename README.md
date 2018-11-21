This React project was created while reading Beginning React (packtpubs.com)
it uses Parcel and that's not in the book so I needed a sample for testing ideas.

In this version,
I added more React code,
I added code to do a fetch from a remote server,
and I'm adding some glitzy Bootstrap 4 components.

To get Bootstrap 4 working I needed
```
npm install reactstrap bootstrap
```
Note the bootstrap package provides stylesheets only.
Refer to http://reactstrap.github.io/ for more information.

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

See "Beginning React".

See also the book "React and React Native", Chapter 11: Mobile-First React Components.
They use react-bootstrap (but not Parcel).
