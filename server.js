import express from 'express'
import schema from './schema'
import {graphql} from 'graphql'
import GraphQLHTTP from 'express-graphql'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: true}))

app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server is running on port 3000")
})