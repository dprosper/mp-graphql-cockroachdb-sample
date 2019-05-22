import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
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
        return result
      }
    }
  })
});

export default Mutation;
