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

export const getInstruments = async (where) => {
    let result = {};
    const select = `SELECT TOP (10) [ID] \
    ,[LAST_OR_ENTITY_NAME] ,[FIRST_NAME] \
    ,[RECORDING_DATE] \
    FROM ${Data.INSTRUMENTS} \
    WHERE `
    
    console.log('where: ', where);
    let pool = await sql.connect(dbConfig);
    let q = select + where
    const data = await pool.request().query(q);
    console.log(data)
    return data; //results.recordsets;
     
}

async function queryDb (queryParm) {
    console.log('qp ', queryParm);
    let pool = await sql.connect(dbConfig);
 
    let data = await pool.request()
        .input('id', sql.Int, queryParm)
        .query(`SELECT TOP(10) LAST_OR_ENTITY_NAME FROM ${Data.INSTRUMENTS}`);
    console.log('data ', data.recordset);
}

queryDb(1);

