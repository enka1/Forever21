import { config } from 'dotenv'
// import {ApolloServer} from 'apollo-server'
import express from 'express'
import GraphQLServer from 'express-graphql'

import connectToMongo from './models/connect'
import schema from './graphql'

config()
connectToMongo()

const app = express()
app.use('/graphql', GraphQLServer({
    schema,
    graphiql: true
}))
app.listen(process.env.PORT)

// const server = new ApolloServer({schema})
// server.listen(process.env.PORT).then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
// });