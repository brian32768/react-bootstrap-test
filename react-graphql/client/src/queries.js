/*

FIXME: I would like to code these directly as .graphql files
but I don't know how to do that yet.

See https://parceljs.org/languages/graphql/

*/
import { gql } from '@apollo/client'

export const GET_INSTRUMENTS = gql`
    query GetInstruments($querytype:QueryType!,$lastname:String!) {
        instruments(querytype:$querytype, lastname:$lastname) {
            objectid
            id
            firstname
            lastname
            recording_date
        }
    }
`;

export const PING = gql`
    query Ping {
        ping
    }
`;

export const INCREMENT_COUNTER = gql`
    # Increments a back-end counter and gets the result.
    mutation IncrementCounter {
        incrementCounter
    }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

