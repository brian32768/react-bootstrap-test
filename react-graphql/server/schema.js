import { GraphQLError } from 'graphql'
import { GraphQLScalarType, Kind } from 'graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { finished } from 'stream/promises'
import DataSource from './datasource.js'

const datasource = new DataSource({});

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            return value.getTime(); // Convert outgoing Date to integer for JSON
        }
        throw Error('GraphQL Date Scalar serializer expected a `Date` object');
    },
    parseValue(value) {
        if (typeof value === 'number') {
            return new Date(value); // Convert incoming integer to Date
        }
        throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // Convert hard-coded AST string to integer and then to Date
            return new Date(parseInt(ast.value, 10));
        }
        // Invalid hard-coded value (not an integer)
        return null;
    },
});

/**
 * A GraphQL schema is a collection of type definitions (hence "typeDefs")
 *  that together define the "shape" of queries that are executed against
 *  your data.
 */
export const typeDefs = `#graphql

    scalar Upload

    scalar Date

    enum QueryType {
        STARTSWITH
        EXACT
        ALL
        ANY
    }

    type Instrument {
        objectid: Int,
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
        ping: Date
        info: Info
        instruments(querytype: QueryType, lastname: String): [Instrument]
    }

    type Mutation {
        incrementCounter : Int!
    }

    type Mutation {
        uploadFile(file: String!): File!
    }
`;

let counter = 0;

/**
 * Resolvers define how to fetch the types defined in your schema.
 */
export const resolvers = {
    Upload: GraphQLUpload,
    Date: dateScalar,

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
                        objectid: i,
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
        uploadFile: async (parent, { file }) => {
            const output = "C:/Temp/output.xlsx";
            console.log("Uploading", file, " to", output);
            const { createReadStream, filename, mimetype, encoding } = await file;
   
            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
            const stream = createReadStream();
            console.log("Uploading", file);
    
            // This will overwrite the same file on EACH upload.
            const out = require('fs').createWriteStream(output);
            stream.pipe(out);
            await finished(out);
  
            return { filename, mimetype, encoding };
        },
        incrementCounter: async (parent) => {
            counter += 1;
            console.log("Counter is now", counter);
            return counter;          
        }
    },

};

/*
// Test the database connection
datasource.test(50201).then((res) => {
    console.log("Result is", res)
})
*/