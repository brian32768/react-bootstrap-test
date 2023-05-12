const express = require('express')
const cors = require('cors')
//const mysql = require('mysql');
const config = require('./config')
const app = express()
const port = 3000

// https://www.positronx.io/express-cors-tutorial/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db_config = {
    host: config.DBHOST,
    user: config.DBUSER,
    password: config.DBPASSWORD,
    database: config.DBNAME
}

const select_inventory = "SELECT * FROM inventory"
const select_tests = "SELECT * FROM test_results"

let connection;

// My database connection was dropping about every 60 seconds
// causing server.js to terminate. So now I watch for that and
// reconnect. Many thanks to the answer here 
// https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection

function handleDisconnect() {
/*
    // Create a new connection
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
        if (err) {
            console.error('db: Error connecting.', err);
            setTimeout(handleDisconnect, 2000)
        } else {
            console.log("db: ready");
        }
    })

    // Add a handler to reconnect whenever the connection is lost.
    // Usually the connection drops because the mysql timeout is short;
    // it can also drop if the mysql server is restarted.
    connection.on('error', function(err) {
        console.error('db: error.', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
    */
}


app.get('/', (req, res) => res.send(`Hello, <b>${config.DBUSER}</b>!<br />`))

app.all('/ping', (req, res) => res.send(
    {"response": new Date()}
))

// Send a query to the inventory table in the database and return the results.
app.get('/server/inventory', async (req, res) => {
    console.log("query");
    console.log(req.query);
/*
    connection.query(select_) + inventory, (err, pages) => {
        (err) ? res.send(err) : res.json(pages);
    })
    */
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
app.get('/server/tests', async (req, res) => {
    console.log("Running tests and returning results.")
/*
    connection.query(select_tests, (err, pages) => {
        (err) ? res.send(err) : res.json(pages);
    })
*/
})

handleDisconnect(); // first time through, create database connection
app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});
