const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
// Load schema resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

// Load db methods
const mongoDataMethods = require('./data/db')

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://nam-nguyen:1234@graphql.ubi6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)

    process.exit(1)
  }
}

connectDB()

const app = express();

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods })
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer().catch(err => console.log(err));

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
});

