import {
    GraphQLObjectType,
    GraphQLList
} from 'graphql';

import AccountType from './AccountType';

const Query = new GraphQLObjectType({
    name: 'RootQuery',

    fields: () => ({
      read: {
        type: new GraphQLList(AccountType),
        async resolve(_, args, context) {
          let result = await context.client.query('SELECT id, transactiontime, balance FROM accounts;')
          return result.rows
        }
      }
    })
});

export default Query;