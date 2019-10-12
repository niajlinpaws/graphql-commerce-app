const { gql } = require('apollo-server-express');


const typeDefs = gql`
  type Product {
    id: Int!
    name: String!
    description: String
    price: Int!
    category(catType: String): [String]
  }

  type User {
    id: Int!
    name: String!
    role: String!
    username: String!
    password: String!
  }

  type Promotion {
    id: Int!
    title: String
    product: Product
    duration: String
    discount: Int
  }

  type CurrentUser{
    username: String
    token: String
    role: String
  }

  type Query {
    allProducts(category: String): [Product]
    getPromotion: Promotion
  }

  type Mutation {
    addProduct(name: String, description: String, price: Int, category: [String]): Product
    updateProductPrice(id: Int!, price: Int): Product
    updatePromotion(pid: Int!, title: String, duration: String, discount: Int): Promotion
    login(username: String!, password: String!): CurrentUser
  }
`;



module.exports = { typeDefs };