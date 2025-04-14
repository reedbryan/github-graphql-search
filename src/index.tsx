import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const token = process.env.REACT_APP_GITHUB_TOKEN;

const link = createHttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);