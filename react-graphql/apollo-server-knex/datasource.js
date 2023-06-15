/*
    Microsoft SQL Server database access

    It's okay to issue sql.connect and use the pool that comes back,
    it keeps track of the pool internally
*/
import { TYPES } from "tedious"
import { Data, Secrets } from './config.js'
import knex from 'knex'

const knexconfig = {
    client: 'tedious',
    connection: {
        host: Secrets.DBHOST,
        port: 1433,
        user: Secrets.DBUSER,
        password: Secrets.DBPASSWORD,
        database: Secrets.DBNAME,
        options: {
            encrypt: true,
            trustServerCertificate: true, // self-signed is okay
            mapBinding: value => {
                // bind all strings to varchar instead of nvarchar
                if (typeof value === 'string') {
                    return {
                        type: TYPES.VarChar,
                        value
                    };
                }

                // allow devs to pass tedious type at query time
                if (value != null && value.type) {
                    return {
                        type: value.type,
                        value: value.value
                    };
                }

                // undefined is returned; falling back to default mapping function
            }
        },
        pool: {
            min: 0,
            max: 10,
            idleTimeoutMillis: 10000
        },
        debug: true // should be set to false in production mode
    }
};

class DataSource {
    constructor(options) {
        this.knex = this.initializeConnection();
        console.log(this.knex)
        this.test(50201).then((res) => {
            console.log("Result is", res);
        });
    }

    async initializeConnection() {
        // https://knexjs.org/guide/#configuration-options
        return await knex(knexconfig);
    }

    async test(queryParm) {
        try {
            let data = await this.knex(['*']).from(Data.INSTRUMENTS)
            return (data.recordset[0] === undefined)? {} : data.recordset[0]
        } catch (err) {
            console.log(err)
            return err;
        }
    }

    async getInstruments(where) {
        const select = `SELECT TOP (100) * FROM ${Data.INSTRUMENTS} `
        try {
            let q = select + ' WHERE ' + where
            console.log('getInstruments query: ', q);
            let data = await this.knex(q)
            return data.recordset; //results.recordsets;
        } catch(err) {
            console.log("getInstruments failed", err)
            return null;
        }
    }
}

const k = new knex(knexconfig);
const res = k.from(Data.INSTRUMENTS).select(['*'])
console.log(k)
console.log(res)


export default DataSource

