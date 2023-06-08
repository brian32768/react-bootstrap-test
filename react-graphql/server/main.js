import path from 'path'
import express from 'express'
import cors from 'cors'
import sql from 'mssql'
import {Secrets} from './config.js'
import fs from 'fs'

const app = express();
const host = "localhost";
const port = 3000;

// https://www.positronx.io/express-cors-tutorial/
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const dbConfig = {
    server: Secrets.DBHOST,
    database: Secrets.DBNAME,
    user: Secrets.DBUSER,
    password: Secrets.DBPASSWORD,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true // self-signed is okay
    }
}

app.get('/', (req, res) => res.send(
    '<!doctype html><html><body><h1>Records Server</h1> \
    This is the API server for Clatsop County records. \
    <h2>REST services</h2> \
    <ul>\
    <li><a href="/ping">ping</a> show server is alive </li>\
    <li><a href="/query">query</a> show REST query contents as JSON </li>\
    <li><a href="/instrument">instrument</a> query instruments by name; <a href="/instrument?lastname=Wilson&firstname=Betty">example</a></li> \
    <li><a href="/instrument_types">instrument_types</a></li> \
    <li><a href="/plat">plat</a> query plat by id; <a href="/plat?platid=PP%202000-0">example</a></li> \
    <li><a href="/document">document</a> fetch a document <a href="/document?id=PP%202000-002">example</a></li> \
    </ul>\
    </body></html>')
)

app.all('/ping', (req, res) => res.send(
    {"response": new Date()}
))

/*
    const request = new Request(q, function(err) {  
        if (err) {  console.log(err); }
    });  
         
    var result = "";  
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
            if (column.value === null) {  
            console.log('NULL');  
            } else {  
            result+= column.value + " ";  
            }  
        });  
        console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);  

    let results = {};
    connection.on('connect', function(err) {
        console.log("Connected to " + config.server);
        results = query(q);
    });

}
*/

app.get('/query', async (req, res) => {
    // Just send the query right back so we can see it.
    res.send({
        "query": req.query
    });
})

// Every field used in a where clause has to be listed here.
const lut = {
    'lastname': 'LAST_OR_ENTITY_NAME',
    'firstname': 'FIRST_NAME',
    'description': 'DESCRIPTION',

    'platid': 'PLAT_IDENTIFICATION',
}

app.get('/instrument', async (req, res) => {
    let result = {};
    const a = Object.keys(req.query)
    let where = ''
    const like = (req.query.t == 'exact')? '': '%'
    a.forEach(k => {
        const col = lut[k]; 
        if (col) { // This will drop any unrecognized fields.
            const v = req.query[k]
            if (v) {
                where = where && (where + ' AND')
                where += ` ${col} LIKE '${v}${like}'`;
            }
        }
    })
    if (where) {
        console.log(where)
        where = ('WHERE ' + where)
    } else {
        res.send([[{"Enter a search term":""}]]);
        return;
    }
    const select = 'SELECT TOP (100) [INSTRUMENT_ID] \
    ,[LAST_OR_ENTITY_NAME] ,[FIRST_NAME] \
    ,[PARTY_ID] ,[PARTY_TYPE] \
    ,[BOOK] ,[PAGE] ,[DESCRIPTION] \
    ,[INSTRUMENT_TYPE_CODE] \
    ,[RECORDING_DATE] \
    FROM [cc-main].[ccuser].[CLERK_V_PARTY_DIRECT]'
    try {
        await sql.connect(dbConfig);
        console.log(where)
        const results = await sql.query(select + where)
        res.send(results.recordsets);
        
    } catch (err) {
        const msg = err.message;
        res.send({"error":msg});
    }
})

app.get('/parties', async (req, res) => {
    let result = {};
    const a = Object.keys(req.query)
    let where = ''
    const like = (req.query.t == 'exact')? '': '%'
    a.forEach(k => {
        const col = lut[k]; 
        if (col) { // This will drop any unrecognized fields.
            const v = req.query[k]
            if (v) {
                where = where && (where + ' AND')
                where += ` ${col} LIKE '${v}${like}'`;
            }
        }
    })
    if (where) {
        console.log(where)
        where = ('WHERE ' + where)
    } else {
        res.send([[{"Enter a search term":""}]]);
        return;
    }
    const select = 'SELECT TOP (100) [INSTRUMENT_ID] \
    ,[LAST_OR_ENTITY_NAME] ,[FIRST_NAME] \
    ,[PARTY_ID] ,[PARTY_TYPE] \
    ,[BOOK] ,[PAGE] \
    ,[DESCRIPTION] \
    ,[RECORDING_DATE] \
    ,[INSTRUMENT_TYPE_CODE] \
    FROM [cc-main].[ccuser].[CLERK_V_PARTY_DIRECT]'
    try {
        await sql.connect(dbConfig);
        console.log(where)
        const results = await sql.query(select + where)
        res.send(results.recordsets);
        
    } catch (err) {
        const msg = err.message;
        res.send({"error":msg});
    }
})

app.get('/plat', async (req, res) => {
    let results = {};
    const a = Object.keys(req.query)
    let where = ''
    const like = (req.query.t == 'exact')? '': '%'
    a.forEach(k => {
        const col = lut[k];
        if (col) {
            const v = req.query[k]
            if (v) {
                where = where && (where + ' AND')
                where += ` ${col} LIKE '${v}${like}'`;
            }
        }
    })

    // If the where clause is empty, return nothing.
    if (where) {
        console.log(where)
        where = ('WHERE ' + where)

    } else {
        res.send([[{"Enter a search term":""}]]);
        return;
    }
    const select = 'SELECT TOP(100) * FROM [ccuser].[CLERK_V_PLAT]'
    try {
        await sql.connect(dbConfig);
        console.log(req.query)
        results = await sql.query(select + where)
        res.send(results.recordsets);
        
    } catch (err) {
        const msg = err.message;
        res.send({"error":msg});
    }
})

app.get('/document', async (req, res) => {
    // Return PDF document file from the server
    // id=STRING
    // optionally f=json
    let results = {};
    try {
        const id = req.query.id;
        let format = req.query.f;
        const where = 'WHERE ' + `[PLAT_IDENTIFICATION]='${id}'`;

        const select = 'SELECT TOP(10) [IMAGE_SERVER],[IMAGE_LOCATION],[IMAGE_NAME] \
                        FROM [ccuser].[CLERK_V_PLAT] ' + where
        console.log(select);
        await sql.connect(dbConfig);
        const sqlresults = await sql.query(select);
        const rows = sqlresults.recordsets[0]; 
        const row = rows[0];
        const filename = row.IMAGE_NAME;

        const pathname = path.join(row.IMAGE_SERVER, row.IMAGE_LOCATION, filename);
        const file = fs.createReadStream(pathname);
        const stat = fs.statSync(pathname);

        if (format == 'json') {
            // Return the name of the file as JSON
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/json');
            res.send({
                'path': pathname,
                'filename': outputfilename
            });
        } else {
            // Return the file as an attachment
            const outputfilename = id.replace(' ', '_') + '.pdf';
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${outputfilename}"`);
            file.pipe(res);
        }

    } catch (err) {
        const msg = err.message;
        res.send({"error":msg});
    }
})

app.listen(port, host, () => {
    console.log(`Server listening at http://${host}:${port}`);
})
