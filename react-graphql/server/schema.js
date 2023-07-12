import { GraphQLError } from 'graphql'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { finished } from 'stream/promises'
import DataSource from './datasource.js'

const datasource = new DataSource({});

/**
 * A GraphQL schema is a collection of type definitions (hence "typeDefs")
 *  that together define the "shape" of queries that are executed against
 *  your data.
 */
export const typeDefs = `#graphql

    scalar Upload

    enum QueryType {
        STARTSWITH
        EXACT
        ALL
        ANY
    }

    type Instrument {
        id: Int
        firstname: String
        lastname: String
        recording_date: String
    }

    type Info {
        host: String,
        name: String
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        ping: String
        info: Info
        instruments(querytype: QueryType, lastname: String): [Instrument]
    }

    type Mutation {
        singleUpload(file: String!): String!
    }
`;

/**
 * Resolvers define how to fetch the types defined in your schema.
 */
export const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        ping : () => {
            return new Date()
        },

        info : () => {
            return {
                host: Secrets.DBHOST,
                name: Secrets.DBNAME,
//                user: Secrets.DBUSER,
//                password: Secrets.DBPASSWORD
            }
        },

        instruments: async (parent,args) => {
            const querytype = args.querytype||'EXACT'
            const lastname = args.lastname
            let where = '[INSTRUMENT_ID]!=0'; // block invalid records
            if (lastname !== undefined) {
                switch (querytype) {
                    case 'EXACT':
                        where = `[LAST_OR_ENTITY_NAME] = '${args.lastname}'`;
                        break;
                    case 'STARTSWITH':
                        where = `[LAST_OR_ENTITY_NAME] LIKE '${args.lastname}%'`;
                        break;
                    case 'ALL':
                    case 'ANY':
                        where = `[LAST_OR_ENTITY_NAME] LIKE '%${args.lastname}%'`;
                        break;
                }
            }
            console.log('where', where)
            const results = await datasource.getInstruments(where);
            //console.log("record set", results);
            let rval = Array();
            if (results != null) {
                for (let i = 0; i < results.length; i++) {
                    let item = results[i]
                    let qitem = {
                        id: item.INSTRUMENT_ID,
                        firstname: item.FIRST_NAME,
                        lastname: item.LAST_OR_ENTITY_NAME,
                        recording_date: item.RECORDING_DATE
                    }
                    rval.push(qitem);
                }
            }
            return rval;
        },
    },
    Mutation: {
        singleUpload: async (parent, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;
   
            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
            const stream = createReadStream();
    
            // This will overwrite the same file on EACH upload.
            const out = require('fs').createWriteStream('output.xlsx');
            stream.pipe(out);
            await finished(out);
  
            return filename ;
        },
    },
};

/*
// Test the database connection
datasource.test(50201).then((res) => {
    console.log("Result is", res)
})
*/