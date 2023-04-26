import { ApolloClient, InMemoryCache } from "@apollo/client";

export const Client = new ApolloClient({
    uri: 'https://hkyqkx.sse.codesandbox.io/',
    cache: new InMemoryCache()
})