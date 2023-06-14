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
    const select = `SELECT TOP (10) [INSTRUMENT_ID] \
    ,[LAST_OR_ENTITY_NAME] ,[FIRST_NAME] \
    ,[RECORDING_DATE] \
    FROM ${Data.INSTRUMENTS} `
//    WHERE `
    try {
        let pool = await sql.connect(dbConfig);
        let q = select + where
        console.log('getInstruments query: ', q);
        let data = await pool.request()
        .input('id', sql.Int, 1)
        .query(`SELECT TOP(100) * FROM ${Data.INSTRUMENTS}`);
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
            .query(`SELECT TOP(2) * FROM ${Data.INSTRUMENTS}`);
        await pool.close();
        return data.recordset;
    } catch (err) {
        return err;
    }
}

queryDb(1).then((res) => {
    console.log("Result is", res);
});

