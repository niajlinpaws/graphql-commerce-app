# GraphQL Commerce App

Fully loaded Ecommerce app, with both server and client app. Built using 

- Front - React + Redux + Apollo Client + Material UI
- Back - Apollo Server + Express

## Features

The application right now is extremely basic. It allows an Admin to sign in and add a product and update product price. All other visitors can filter the product list using the Chips shown on the top, and view product details.

The branch `two-redux-stores` contains an additional Redux store along with the `cache` store Apollo Client creates.

## Future Features

Eventually the `master` branch will contain only the Apollo Client cache, and `apollo-link-state` will be used to access the data directly from there. The key features for the future are:

- Client
- Add routing with clearer structuring of components
- Add Customer login
- Activate Buy Now option
- Add Subscription to update store whenever someone makes a purchase
- Add Wishlist feature
- Add Verified Customer reviews option
- Add currency selection
- Add tests

- Server
- Add MongoDB database
- Add JSON Web Token authentication
- Add more mutations/queries to allow features mentioned above
- Add tests


