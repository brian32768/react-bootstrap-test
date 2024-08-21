/*
    Microsoft SQL Server database access
*/
import sql from "mssql"
import { Secrets } from './config.js'

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

    try {
        await sql.connect(dbConfig);
        const results = await sql.query(select + where)
//        console.log(results)
        return results.recordsets;
        
    } catch (err) {
        const msg = err.message;
        console.log(msg);
        return null;
    }
}

