import React from 'react';
import { Mutation } from 'react-apollo';
import { Grid, TextField, Button } from '@material-ui/core';
import { ADD_PRODUCT } from '../../graphql/mutations';
import { GET_ALL_PRODUCTS } from '../../graphql/queries';


/**
 * Allows Admin to add a new product. The Component then uses the update property of the Mutation Component
 * to udpate list of products so the changes are visible to the customers immediately.
 *
 * @function AddProduct
 * @extends {Component}
 */
const AddProduct = (props) => {

    return (
      <Mutation mutation={ADD_PRODUCT}
        update={(cache, {data : { addProduct }}) => {
          const allProductsData = cache.readQuery({ query: GET_ALL_PRODUCTS, variables: {category: null}});
          allProductsData.allProducts.push(addProduct);
          cache.writeQuery({
            query: GET_ALL_PRODUCTS,
            variables: {category: null},
            data: { allProducts: allProductsData.allProducts}
          });
        }}>
      {(addProduct) => (
        <Grid container direction="column">
          <Grid item>
            <TextField fullWidth label="Product name" type="text" value={props.product.name} onChange={props.handleInputChange('name')} margin="normal"/>
          </Grid>
          <Grid item>
            <TextField fullWidth label="Product description" type="text" value={props.product.description} onChange={props.handleInputChange('description')} margin="normal"/>
          </Grid>
          <Grid item>
          <TextField fullWidth label="Product price" type="text" value={props.product.price} onChange={props.handleInputChange('price')} margin="normal"/>
          </Grid>
          <Grid item>
          <TextField fullWidth label="Product categories" type="text" value={props.product.category} onChange={props.handleInputChange('category')} margin="normal" helperText="Separate categories with ,"/>
          </Grid>
          <Grid item style={{marginTop: '2rem'}}>
            <Button onClick={() => props.onformSubmit(addProduct)} variant="contained">Add Product</Button>
          </Grid>
        </Grid>
      )
      }
      </Mutation>
    )
}

export default AddProduct;