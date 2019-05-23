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
        let result = await context.client.query(`INSERT INTO accounts (balance) VALUES (${args.balance});`);
        context.client.release();
        return result;
      }
    }
  })
});

export default Mutation;
