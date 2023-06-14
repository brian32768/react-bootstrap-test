import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//import {} from './promises.js';
//import { dbConfig, getInstruments } from './mock_data.js';
import { dbConfig, getInstruments } from './database.js';

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GraphQLError } from 'graphql';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// A schema is a collection of type definitions (hence "typeDefs")
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
    instruments: [Instrument]
    instrument(id: Int!): Instrument
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

        instruments: async () => {
            const results = await getInstruments("[LAST_OR_ENTITY_NAME] = 'WILSON'");
            console.log("record set", results);
            // Basically I am doing an ORM thing here.
            // I am sure there is some Apollo thing that would do this for me.
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
        }, // return all

        instrument: async (parent,args) => { // return only matches
            console.log(args);
            const results = await getInstruments("[INSTRUMENT_ID] = 50201");
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

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
    listen: { port: 4000 },
    context: ({req}) => {
        return {connection: dbConfig}; 
    }
}).then( s => {
    console.log('Server ready',s.url);
});
  
