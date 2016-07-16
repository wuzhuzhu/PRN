import ApolloClient from 'apollo-client';

export const apolloClient = new ApolloClient();
export const apolloMiddleware = apolloClient.middleware();
export const apolloReducer = apolloClient.reducer();