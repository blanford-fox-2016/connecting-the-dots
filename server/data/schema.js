import mongoose from 'mongoose'
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql'

let Counter = mongoose.model('Counters', {
  id: mongoose.Schema.Types.ObjectId,
  counter: Number
})

mongoose.connect('mongodb://localhost:27017/db_connectiong_dot', (err) => {
  if(err){
    console.log(err);
  }else{
    console.log(`mongo connected`);
  }
})

let CounterType = new GraphQLObjectType({
  name: 'counter'
  ,
  fields: () => ({
    counter: {
      type: GraphQLInt,
      description: "Counter"
    }
  })
})

let QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    counter: {
      type: CounterType,
      resolve: () => {
        return {
          counter: 42
        }
      }
    }
  })
})
/*
{counter {
  counter
}}
mutation{add(counter:1 ) {
  counter
}}
*/

let MutationAdd = {
  type: CounterType,
  description: "Add Counter",
  args: {
    counter :{
      type: GraphQLInt
    }
  },
  resolve: (root, args) => {
    return {
      counter: args.counter+1
    }
  }
}

let MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd
  }
})

let schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})

export default schema
/*
mutation{add(name:"ken", age:22) {
  id name age
}}
query{users {
  id name age
}}
*/
