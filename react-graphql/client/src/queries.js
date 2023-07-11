/*

FIXME: I would like to code these directly as .graphql files
but I don't know how to do that yet.

See https://parceljs.org/languages/graphql/

*/
import { gql, useQuery } from '@apollo/client'

export const GET_INSTRUMENTS = gql`
    query GetInstruments($querytype:QueryType!,$lastname:String!) {
        instruments(querytype:$querytype, lastname:$lastname) {
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
