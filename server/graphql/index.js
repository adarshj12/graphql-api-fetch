const { ApolloServer } = require('@apollo/server');
const axios =require('axios');

const server = new ApolloServer({
    typeDefs:`
        type Todo {
            id:ID!
            title:String!
            completed:Boolean
            userId:ID!
            user:User
        }
        type User {
            id:ID!
            name:String!
            username:String!
            email:String!
            address:Address
        }
        type Address {
            street:String!
            suite:String!
            city: String!
            zipcode: String!
        }
        type Query {
            getTodos:[Todo]
            getAllUsers:[User]
            getUser(id:ID!):User
        }
    `,
    resolvers:{
        //converting 2 api calls to 1
        // * - * //
        Todo:{
            user:async(todo)=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data
        },
        // * - * //
        Query:{
            getTodos:()=> axios.get(`https://jsonplaceholder.typicode.com/todos`).then(res=>{
                return res.data
            }),
            getAllUsers:async()=>(await axios.get(`https://jsonplaceholder.typicode.com/users`)).data,
            getUser:async(parent,{id})=>(await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
        }
    }
});

module.exports=server;