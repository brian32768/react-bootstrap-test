import path from "path";
import express, { express, NextFunction, Request, Response } from "express";
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import { IContact } from "./Contacts";
import config from "./config";

const app : Express = express();
const port = 3000

app.use(express.json());

const db_config = {
    host: config.IMAPHOST,
    user: config.IMAPUSER,
    password: config.IMAPPASSWORD
}

app.get('/', (req, res) => res.send(`Hello, <b>${config.IMAPUSER}</b>!<br />`))

app.all('/ping', (req, res) => res.send(
    {"response": new Date()}
))

app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    inNext();
});

// Send a query to the inventory table in the database and return the results.
app.get('/messages', async (req, res) => {
    console.log("query");
    console.log(req.query);
    const mock = [
        {
            "id": 1,
            "owner": "John West",
            "taxmapkey": "400181000DC001400"
        },
        {
            "id": 2,
            "owner": "Sephowin",
            "taxmapkey": "400181000DC001401"
        }    ];
    res.send(mock);
})

// Send a query to the test results table in the database and return the results.
app.get('/tests', async (req, res) => {
    console.log("Running tests and returning results.")
})

app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});
