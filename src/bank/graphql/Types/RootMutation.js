import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from "graphql";

const Mutation = new GraphQLObjectType({
  name: "RootMutation",
  description: "Mutation interface",
  fields: () => ({
    add: {
      type: new GraphQLObjectType({
        name: 'Add',
    
        fields: () => ({
          rowCount: { type: GraphQLString }
        })
      }),
      args: {
        balance: {
          type: new GraphQLNonNull(GraphQLString),
          description: "balance to add"
        }
      },
      async resolve (_, args, context) {
        const client = await context.pool.connect();
        client.on('connect', () => {
          console.log(`${chalk.green('connected to the db')}`);
        });
        let result = await client.query(`INSERT INTO accounts (balance) VALUES (${args.balance});`);
        client.release();
        console.log(result);
        return result;
      }
    }
  })
});

export default Mutation;
