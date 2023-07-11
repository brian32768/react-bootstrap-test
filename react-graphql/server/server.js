import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import { typeDefs, resolvers } from './schema.js'

const PORT = 4000;

const app = express();
const httpServer = http.createServer(app);

const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        //landingpage,        // FIXME where is the plugin???

        // https://www.apollographql.com/docs/apollo-server/api/plugin/drain-http-server/
        ApolloServerPluginDrainHttpServer({ httpServer }), // this is supposed to provide a clean shutdown
    ],
})
await apolloserver.start();

app.use(
    '/api', // put it at "https://records.clatsopcounty.gov/api/"

    // https://www.apollographql.com/docs/apollo-server/security/cors/#specifying-origins
    cors(), // allow everything for now
//  cors({
//        origin: [
//            'https://records.clatsopcounty.gov', // in production
//            'http://localhost:8080', // in development
//        ],
//    }),

    bodyParser.json(),

    // takes an optional context function, see https://www.apollographql.com/docs/apollo-server/data/context/#the-context-function
    expressMiddleware(apolloserver),
)

const s = process.env.NODE_ENV === 'production'
    ? "https://foxtrot.clatsopcounty.gov"
    : "http://localhost:4000";

app.listen({ port:PORT }, ()=>{
    // this is a server so messages go to a log
    console.log(`Load sandbox: ${s}/api`);
});
