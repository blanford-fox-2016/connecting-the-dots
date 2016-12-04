import express from 'express'
import schema from './data/schema'
import { graphql } from 'graphql'
import GraphQLHTTP from 'express-graphql'
import logger from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(logger())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/graphql', (req, res) => {
  // let query = `{counter {
  //               counter
  //             }}`

  graphql(schema, req.query.query)
    .then(result => res.json(result))
})

app.use('/graphql', GraphQLHTTP({
  schema: schema,
  pretty: true,
  graphiql: true
}))

app.listen(3000, (err) => {
  if(err){
    console.log(err);
  }else{
    console.log(`server is running in port 3000`);
  }
})
