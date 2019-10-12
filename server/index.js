if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./src/graphql/schema');
const { resolvers } = require('./src/graphql/resolvers');

const authController = require('./src/controller/jwt');

const app = require('./config/app');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.auth || null;
    if (token) {
      let user = authController.verifyToken(token);
      return { user };
    }
  }
});

server.applyMiddleware({ app });

app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is ready at ${server.graphqlPath}`);
});