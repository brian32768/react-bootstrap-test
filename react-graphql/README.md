# react-bootstrap-test/react-graphql

2023-06-16 This phase of my project is done, so I will be moving
the work I have done here into my real project today.

My application is simple so it does not need Redux or complex routing.
Pretty much it's a single form, maybe with an advanced form... so 2 forms...

On the data side, I have to access SQL Server and ugly tables.

Initially I tried making SQL relatively transparent and used REST calls.

This example uses GraphQL (via Apollo) to encapsulate the ugly SQL tables
in the server side, passing only elegant data back to the client.

On the client side I will need a GraphQL client so I will try Apollo. I tried Relay and fell flat on my face. 

I have little experience with ORMs. I know they are an approach to this
problem too, but I think would also be overkill here.

So... summing up,

* client side: React and Apollo and Bootstrap and JavaScript (no TypeScript, no Redux)
* server side: Node and JavaScript and Apollo GraphQL

**No TypeScript** I tried to get a handle on TypeScript and finally decided last night that I actually need to get my app working within the next 3 weeks, not 3 years. Typed languages slow me down
and I can make just as many misteaks. C was okay and maybe C++, but C# and Java? PASS. #life2short

## Debug etc

Open a terminal window and split it. In one side run

    cd apollo-client
    npm install
    npm start

This runs the client at http://localhost:1234.
You can debug it by selecting "Debug react-graphql-client" and doing F5.

In the other side run

    cd apollo-server-mssql
    npm install
    npm start

This runs a server on port 4000, you can see the sandbox at http://localhost:4000
You can debug it by doing ^-shift-P Toggle Auto Attach. The debugger then just
works. It will start when you do "npm start".

## GraphQL, on the server side

The client sends queries in JSON, and the server does the database work and then sends back a JSON object in the same shape.
For example, this query

    {
        instrument(id: 123456) {
            id,
            firstname,
            lastname,
            recording_date
        }
    }

might return

    {
        "instrument": {
            "id": 123456,
            "firstname" : "James",
            "lastname" : "Dean",
            "recording_date": "01-01-1957"
        }
    }

The shape of the data is determined by the client instead of the server, that's cool, that's what I want. The server still has to map the actual database column names but I will see how to do that soon.
## Apollo

Beautiful out of box experience. I switched to Apollo for everything.
When you set up an Apollo Server, an Apollo Sandbox (web page) will be running at root path. The sandbox lets you test queries against the server. 

There is a server component and a client component. 

There is a thing called Apollo Studio but I think it's for the supported cloud based version not the self-hosted version.

## SQL

The database in use here is SQL Server, and for node that means node-mssql. I am at a loss as to the differences between node-mssql and tedious so I gave up and when with node-mssql. They seem to be two faces of the same coin.

## Resources

[Full Stack Graphql Applications: With React, Node.js, and Neo4J](https://acm.percipio.com/books/0827e186-d1c8-4a48-86a1-93e48ea0a3c3#epubcfi(/6/34!/4/2%5Bepubmain%5D/2%5Bch01lev1sec4%5D/2/2/1:0)) FYI "Neo4J" is a "graph database". Whatever that is.
I don't care. I ignored the Neo4J chapters because I have to use MS SQL.

[React Quickly—Painless Web Apps with React, JSX, Redux, and GraphQL](https://acm.percipio.com/books/0466b36a-c7fc-4ebc-9722-b431012416fb#epubcfi(/6/234!/4/2%5Bepubmain%5D/2%5Bch15%5D/2/2/1:0)) especially Chapter 15: Working with Data using GraphQL This book covers "express-graphql" which has been superceded by "graphql-http". That broke it for this newbie.

[GraphQL](https://github.com/graphql/graphql-js)

[GraphQL-HTTP](https://github.com/graphql/graphql-http)

[Apollo](https://apollographql.com) a GraphQL developer platform.
** Make sure you are looking at the V4 docs, it's easy to 
use search and end up on V2 or V3. **

[KNEX](https://knexjs.org/) is a query builder, not an ORM but it makes talking to MS SQL easier. I started to try it out but time was short and I stuck with direct MSSQL access.

[Why you shouldn't use ORMS](https://blog.logrocket.com/)node-js-orms-why-shouldnt-use/

[Relay, a GraphQL client](https://relay.dev/)

