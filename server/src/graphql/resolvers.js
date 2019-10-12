const _ = require('lodash');

const productsList = require('../assets/products.json').products;
const promotion = require('../assets/products.json').promotion;
const userList = require('../assets/users.json').users;

const { generateToken } = require('../controller/jwt');


/**
 *  Extremely basic GraphQL server to deliver content for client. No persistent data store.
 */
const resolvers = {
  Query: {
    allProducts: (parent, args, context, info) => {
      let products = [];
      if (args.category) {
        products = _.filter(productsList, function (product) {
          let index = product.category.findIndex(function (elem) { return elem === args.category; });
          if (index >= 0) {
            return product;
          }
        });
      } else {
        products = [...productsList];
      }
      return products;
    },
    getPromotion: () => promotion
  },
  Mutation: {
    addProduct: (parent, args, context, info) => {
      if(context.user && context.user.role === 'Admin'){
        const newId = Math.floor(Math.random() * (1000)) + 7;
        const newProduct = {
          id: newId,
          name: args.name,
          description: args.description,
          price: args.price,
          category: args.category
        };
        productsList.push(newProduct);
        return newProduct;
      }else{
        return new Error('Unauthorized');
      }
    },
    updateProductPrice: (parent, args, context, info) => {
      if(context.user && context.user.role === 'Admin'){
        let productIndex = productsList.findIndex((productVal) => productVal.id === args.id);
        if(productIndex >= 0){
          let updatedProduct = {...productsList[productIndex]};
          updatedProduct.price = args.price;
          productsList[productIndex] = updatedProduct;
          return updatedProduct
        }else{
          return new Error('Product not found');
        }
        
      }else{
        return new Error('Unauthorized');
      }
    },
    login: (parent, args, context, info) => {
      let user = _.find(userList, function(user){
        if(user.username === args.username && user.password === args.password){
          return user;
        }
      });
      if(user){
        let token = generateToken(user.id, user.role);
        let result = {
          username: user.username,
          token,
          role: user.role
        };
        return result;
      }else{
        return null;
      }
    }
  }
};

module.exports = { resolvers };