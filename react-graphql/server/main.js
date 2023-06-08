import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

import { schema } from './schema.js'

const app = express();
const HOST = "localhost";
const PORT = 3000;

app.get('/', (req, res) => res.redirect('/public/help.html'));

// This shows how I could return many static HTML files
app.use('/public', express.static(path.join(__dirname, '/public')))

// Here's the entry point for the GraphQL queries
app.all('/q', createHandler({schema})); 

app.get('/favicon.ico', (req, res) => res.sendFile(
    path.join(__dirname, '/assets/favicon.ico')
))  

// This is really for Docker healthchecks
app.get('/ping', (req, res) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", '*');
    res.send({"response": new Date()})
})

app.listen({port:PORT, host:HOST}, () => {
    console.log(`Server listening at http://${HOST}:${PORT}/`);
})
