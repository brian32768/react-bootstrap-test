import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GraphQLError } from 'graphql';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

import DataSource from './datasource.js';
const datasource = new DataSource({});

// A GraphQL schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
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


# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
    help: String
    ping: String
    info: Info
    instruments(searchtype: String, lastname: String): [Instrument]
    instrument(id: ID!): Instrument
}
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        help: () => {
            const htmlPath = path.join(__dirname, 'public', 'help.html');
            console.log(htmlPath)
            if (fs.existsSync(htmlPath)) {
                const html = fs.readFileSync(htmlPath);
                return `data:text/html;${html}`
            } else {
                throw new GraphQLError('File not found', {
                    extensions: {
                        code: 'CLIENT_ERROR',
                        http: {
                            status: 404,
                        }
                    }
                });
            }
        },
        
        ping : () => {
            return new Date().toString()
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
            const searchtype = args.searchtype||'EXACT'
            const lastname = args.lastname
            let where = '[INSTRUMENT_ID]!=0'; // block invalid records
            if (lastname !== undefined) {
                switch (searchtype) {
                    case 'EXACT':
                        where = `[LAST_OR_ENTITY_NAME] = '${args.lastname}'`;
                        break;
                    case 'STARTSWITH':
                        where = `[LAST_OR_ENTITY_NAME] LIKE '${args.lastname}%'`;
                        break;
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

        instrument: async (parent,args) => {
            console.log('args: ',args);
            let id = args.id;
            const results = await datasource.getInstruments(`[INSTRUMENT_ID] = ${id}`);
            let qitem = {
                id: 0,
                firstname: '',
                lastname: '',
                recording_date: ''
            }
            if (results != null) {
                let item = results[0]
                qitem = {
                    id: item.INSTRUMENT_ID,
                    firstname: item.FIRST_NAME,
                    lastname: item.LAST_OR_ENTITY_NAME,
                    recording_date: item.RECORDING_DATE
                }
            }
            return qitem;
        }
    },
};

// Test the database connection
datasource.test(50201).then((res) => {
    console.log("Result is", res)
})

const server = new ApolloServer({typeDefs, resolvers});

// https://www.apollographql.com/docs/apollo-server/api/standalone
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const {url} = await startStandaloneServer(server)
console.log('Server ready: ', url);
