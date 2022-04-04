const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// Load schema resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer().catch(err => console.log(err));

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});

