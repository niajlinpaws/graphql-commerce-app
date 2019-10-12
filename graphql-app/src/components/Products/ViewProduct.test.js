import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Typography } from '@material-ui/core';

import ViewProduct from './ViewProduct';

const mockProduct = {
  name: 'Test',
  description: 'Test Description',
  price: 0,
  category: ['A', 'B']
};

//Very basic test to check if the three Typography tags are rendered
describe('<ViewProduct />', () => {
  it('should render without error', () => {
    const component = TestRenderer.create(<ViewProduct product={mockProduct} />);
    const testInstance = component.root;

    expect(testInstance.findAllByType(Typography).length).toEqual(3);

  });
});