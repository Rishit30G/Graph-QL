const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("../server/schema/type-defs");
const { resolvers } = require("../server/schema/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: https://localhost:4000`);
