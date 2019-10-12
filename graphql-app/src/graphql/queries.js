import gql from 'graphql-tag';

export const GET_ALL_PRODUCTS = gql`
query AllProducts($category: String){
  allProducts(category: $category){
    id
    name
    description
    price
    category
  }
}
`;

export const GET_PROMOTION = gql`
query GetPromotion{
  getPromotion{
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
