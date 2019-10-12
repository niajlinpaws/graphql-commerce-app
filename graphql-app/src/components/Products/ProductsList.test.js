import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from 'react-apollo/test-utils';

import { Chip } from '@material-ui/core';

import { GET_ALL_PRODUCTS } from '../../graphql/queries';
import { ProductsList } from './ProductsList';

const mocks = [
  {
    request: {
      query: GET_ALL_PRODUCTS
    },
    result: {
      data: {
        allProducts: [
          {
            "id": 1,
            "name": "Apple",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
            "price": 50,
            "category": ["fruit", "edible"]
          },
          {
            "id": 2,
            "name": "Olives",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
            "price": 100,
            "category": ["fruit", "edible"]
          },
          {
            "id": 3,
            "name": "Tomato",
            "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
            "price": 60,
            "category": ["vegetable", "edible"]
          }]
      }
    }
  }
];

const mockCategories = ['A', 'B', 'C'];

describe('<ProductList />', () => {
  it('renders without error', () => {
    const component = TestRenderer.create(<MockedProvider mocks={mocks} addTypename={false}>
    <ProductsList categories={mockCategories} categoriesSet={true}/>
    </MockedProvider>);
    
    const testInstance = component.root;
    expect(testInstance.findAllByType(Chip).length).toEqual(4);
  });
});
