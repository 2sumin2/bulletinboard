import { ApolloClient, InMemoryCache, makeVar, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const TOKEN = "TOKEN";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
function createUploadLink(arg0: { uri: any; headers: { authorization: any; 'keep-alive': string; }; }) {
    throw new Error('Function not implemented.');
}

function bearerAuthorization(arg0: any): any {
    throw new Error('Function not implemented.');
}

function getCookies(arg0: string): any {
    throw new Error('Function not implemented.');
}

