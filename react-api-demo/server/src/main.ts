import path from "path"
import express, { Express, NextFunction, Request, Response } from 'express'

const app: Express = express();

app.use(express.json()); // parse incoming queries into JSON objects

app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
  //    inResponse.header("Access-Control-Allow-Origin", "*"); // Allow connections from thither and yon
      inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
      inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
      inNext();
});
  
// In production mode, this serves the client app from the root path
// during development I run it separately so that Parcel can do HMR
app.use("/",  express.static(path.join(__dirname, "../../client/dist")));

// Serve our documentation as boring static files.
app.use("/docs",  express.static(path.join(__dirname, "../../docs")));

/*
app.get("/mailboxes",
  async (inRequest: Request, inResponse: Response) => {
    try {
      const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
      const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
      inResponse.json(mailboxes);
    } catch (inError) {
      inResponse.send("error");
    }
  }
);
*/

app.get("/pigeon", () => {
  const response = new Response();
  response.send(cd )
});

app.listen(3000, function () {
  console.log('App started on http://localhost:3000/');
});