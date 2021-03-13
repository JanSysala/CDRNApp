import {gql} from "apollo-boost";

export const GET_INSTRUMENTS = gql`
    query Instruments {
        instruments {
            id
            ticker
        }
    }
`;

export const ADD_INSTRUMENT = gql`
    mutation AddInstrumentInput($ticker: String!) {
        addInstrument(input: {ticker: $ticker}) {
            id
            ticker
        }
    }
`;


export const DELETE_INSTRUMENT = gql`
    mutation DeleteInstrument($id: ID!) {
        deleteInstrument(id: $id) {
            id
        }
    }
`;