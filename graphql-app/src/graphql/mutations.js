import gql from 'graphql-tag';

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String, $description: String, $price: Int, $category: [String]){
    addProduct(name: $name, description: $description, price: $price, category: $category) {
      id
      name
      description
      price
      category
    }
  }
`;

export const UPDATE_PRODUCT_PRICE = gql`
  mutation UpdateProductPrice($id: Int!, $price: Int){
    updateProductPrice(id: $id, price: $price) {
      id
      name
      description
      price
      category
    }
  }
`;

//Not implemented
export const UPDATE_PROMOTION = gql`
  mutation UpdatePromotion($productId: Int!, $title: String, $duration: String, $discount: Int, $product: Product){
    updatePromotion(pid: $productId, title: $title, duration: $duration, discount: $discount, product: $product){
      title
      product{
        name
        price
      }
      duration
      discount
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!){
    login(username: $username, password: $password){
      username
      token
      role
    }
  }
`;