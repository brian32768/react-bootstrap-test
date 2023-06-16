/*
    Microsoft SQL Server database access

    FIXME - initialize the pool in the constructor
    There is no penalty in doing it in each method, 
    but it would be more aesthetically pleasing.

*/
//import { Connection } from 'tedious'
import sql from 'mssql'
import { Data, Secrets } from './config.js'

const dbConfig = {
    server: Secrets.DBHOST,
    port: 1433,
    user: Secrets.DBUSER,
    password: Secrets.DBPASSWORD,
    database: Secrets.DBNAME,
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 10000,
        acquireTimeoutMillis: 5000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true // self-signed is okay
    }
}

const config = {
    server: Secrets.DBHOST,
    authentication: {
        type: "default", 
        options: {
            userName: Secrets.DBUSER,
            password: Secrets.DBPASSWORD
        }
    },
    options: {
        encrypt: true,
        database: Secrets.DBNAME,
        trustServerCertificate: true // self-signed is okay
    
    }
}
class DataSource {
    constructor() {
        console.log("Connecting to database");
        /*
        let connection = new Connection(config);
        connection.on('connect', function(err){
            console.log('Connected');
        });
        */
    }

    async test(queryParm) {

        console.log('test ', queryParm);
        
        try {
            let pool = await sql.connect(dbConfig);
            let data = await pool.request()
                .input('id', sql.Int, queryParm) // Don't need this unless there's a parameter in the query
                .query(`SELECT * FROM ${Data.INSTRUMENTS} WHERE INSTRUMENT_ID=@id`);
            return (data.recordset[0] === undefined)? {} : data.recordset[0]
        } catch (err) {
            return err;
        }
        
       return {}
    }

    async getInstruments(where) {
        const select = `SELECT TOP (100) * FROM ${Data.INSTRUMENTS}`
        try {
            let pool = await sql.connect(dbConfig);
            let q = select + (where? (' WHERE ' + where) : '')
            console.log('getInstruments(', q, ')' );
            let data = await pool.request()
                .query(q);
            console.log("Matched: ", data.recordset.length)
            return data.recordset
        } catch(err) {
            console.log("getInstruments failed", err)
            return null;
        }
        
    }
}
export default DataSource


