import express from 'express'
import schema from './model/counter'
import {graphql} from 'graphql'
import GraphQLHTTP from 'express-graphql'
import bodyParser from 'body-parser'

const app = express()
var test = []
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: true}))

app.get('/graphql', (req, res) => {
    test.push(1)
    res.json({
        data: {
            counter: Number(req.query.query) + test.length
        }
    })
})

app.get('/api/items', (req, res) => {
    let query = '{users {id, name, age}}'
    graphql(schema, query).then((result) => {
        res.json(result)
    })
})

app.use('/graphql', GraphQLHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
}))

app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server is running on port 3000")
})