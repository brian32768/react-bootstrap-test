import React, {useState, useEffect}  from 'react';   // eslint-disable-line no-unused-vars

/*
import { GraphQLError } from 'graphql';
import { Network, Observable, RequestParameters, Variables } from 'relay-runtime';
import { createClient } from 'graphql-http';

const client = createClient({
  url: 'http://localhost:3000/q',
  headers: async () => {
    const session = await getSession();
  },
});

function fetch(operation, variables) {
  return Observable.create((sink) => {
    return client.subscribe(
      {
        query: "hello"
      },
      sink,
    );
  });
}

export const network = Network.create(fetch);
*/

const Home = () => {
    let [hello, setHello] = useState("");
  /*
    const client = createClient({url: 'http://localhost:3000/q'});
    useEffect( () => {
        async function getHello() {
            let cancel = () => {
                  // abort the request if it is in-flight
            };
              
            const result = await new Promise((resolve, reject) => {
                let result;
                cancel = client.subscribe(
                    {
                        query: '{ hello }',
                    },
                    {
                        next: (data) => (result = data),
                        error: reject,
                        complete: () => {
                            console.log('response is ' + result)
                            setHello("Brian");
                            resolve(result);
                        },
                    },
                );
            });
              
            expect(result).toEqual({ hello: 'world' });
        }
        getHello();
    })
*/
    return (
        <>
        <h1>Home</h1>
        Hello, {hello}
        </>
    );
}
export default Home;
