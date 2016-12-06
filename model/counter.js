import mongoose from 'mongoose'
import  {
    GraphQLObjectType,
    GraphQLID,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql'

let ItemQuery = mongoose.model('ItemQuery', {
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    category: String,
    category: {
        name: String
    }
})

let CategoryQuery = mongoose.model('CategoryQuery', {
    id: mongoose.Schema.Types.ObjectId,
    name: String
})

mongoose.connect('mongodb://localhost/biodatadb', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('mongo connected')
    }
})

let ItemQueryType = new GraphQLObjectType({
    name: 'itemquery',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID User'
        },
        title: {
            type: GraphQLString,
            description: 'Title'
        },
        description: {
            type: GraphQLString,
            description: 'Description'
        }
    })
})

let CategoryQueryType = new GraphQLObjectType({
    name: 'categoryquery',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'ID User'
        },
        name: {
            type: GraphQLString,
            description: 'Name'
        }
    })
})

let getAll = () => {
    return new Promise((resolve, reject) => {
        User.find((err, users) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(users)
            }
        })
    })
}

let QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        users: {
            type: new GraphQLList(ItemQueryType),
            resolve: () => {
                return getAll()
            }
        }
    })
})

let MutationAdd = {
    type: ItemQueryType,
    description: 'add a user',
    args: {
        name: {
            name: 'nama dari user',
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            name: 'umur dari user',
            type: GraphQLInt
        }
    },
    resolve: (root, args) => {
        let newUser = new User({
            name: args.name,
            age: args.age
        })
        newUser.id = newUser._id
        return new Promise((resolve, reject) => {
            newUser.save((err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(newUser)
                }
            })
        })
    }
}


let MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        add: MutationAdd
    }
})

let Schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})

export default Schema