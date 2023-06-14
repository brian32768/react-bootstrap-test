/*
    Microsoft SQL Server database access
*/
import sql from "mssql"
import { Data, Secrets } from './config.js'

export const dbConfig = {
    server: Secrets.DBHOST,
    database: Secrets.DBNAME,
    user: Secrets.DBUSER,
    password: Secrets.DBPASSWORD,
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 10000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true // self-signed is okay
    }
}

export const getInstruments = async (where) => {
    const select = `SELECT TOP (10) * FROM ${Data.INSTRUMENTS} `
    try {
        let pool = await sql.connect(dbConfig);
        let q = select + ' WHERE ' + where
        console.log('getInstruments query: ', q);
        let data = await pool.request()
        .input('id', sql.Int, 1)
        .query(q);
        await pool.close();
        return data.recordset; //results.recordsets;
    } catch(err) {
        console.log("getInstruments failed", err)
        return null;
    }
}

async function queryDb (queryParm) {
    console.log('qp ', queryParm);
    let pool;
    try {
        pool = await sql.connect(dbConfig);
    } catch (err) {
        return err;
    }
    try {
        let data = await pool.request()
            .input('id', sql.Int, queryParm)
            .query(`SELECT * FROM ${Data.INSTRUMENTS} WHERE INSTRUMENT_ID=@id`);
        await pool.close();
        return (data.recordset[0] === undefined)? {} : data.recordset[0]
    } catch (err) {
        return err;
    }
}

queryDb(50201).then((res) => {
    console.log("Result is", res);
});


