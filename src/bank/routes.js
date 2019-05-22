import graphQLHTTP from "express-graphql";
import bank_schema from './graphql/schema';

module.exports = function (app, client) {
  app.use('/api/bank', graphQLHTTP((req, res) => {
    return {
      context: { client },
      schema: bank_schema,
      graphiql: true
    }
  }));
};
