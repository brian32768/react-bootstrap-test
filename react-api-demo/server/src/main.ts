import path from "path"
import express, { Express, NextFunction, Request, Response } from 'express'

const app: Express = express();

app.use(express.json());

// In production mode, this serves the client app from the root path
// during development I run it separately so that Parcel can do HMR
app.use("/",  express.static(path.join(__dirname, "../../client/dist")));

app.use("/docs",  express.static(path.join(__dirname, "../../docs")));

app.listen(3000, function () {
  console.log('App started on http://localhost:3000/');
});