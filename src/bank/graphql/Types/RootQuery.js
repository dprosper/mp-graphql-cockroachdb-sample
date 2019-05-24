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
          const client = await context.pool.connect();
          client.on('connect', () => {
            console.log(`${chalk.green('connected to the db')}`);
          });

          let { rows } = await client.query('SELECT id, transactiontime, balance FROM accounts;');
          client.release();
          console.log(rows);
          return rows;
        }
      }
    })
});

export default Query;