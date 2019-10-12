/** 
 * TODO Add a form to update product price and more
*/
import React from 'react';
import { Mutation } from 'react-apollo';
import { Grid, TextField, Button, Typography, Chip } from '@material-ui/core';
import { UPDATE_PRODUCT_PRICE } from '../../graphql/mutations';
import { GET_ALL_PRODUCTS } from '../../graphql/queries';


/**
 * Allows Admin to add a new product. The Component then uses the update property of the Mutation Component
 * to udpate list of products so the changes are visible to the customers immediately.
 *
 * @function AddProduct
 * @extends {Component}
 */
const UpdateProduct = (props) => {

    return (
      <Mutation mutation={UPDATE_PRODUCT_PRICE}
        update={(cache, {data : { updateProductPrice }}) => {
          const allProductsData = cache.readQuery({ query: GET_ALL_PRODUCTS, variables: {category: null}});
          let productIndex = allProductsData.allProducts.findIndex((product) => product.id === updateProductPrice.id);
          let updatedProduct = {...allProductsData.allProducts[productIndex]};
          updatedProduct.price = updateProductPrice.price;
          allProductsData.allProducts[productIndex] = updatedProduct;
          cache.writeQuery({
            query: GET_ALL_PRODUCTS,
            variables: {category: null},
            data: { allProducts: allProductsData.allProducts}
          });
        }}>
      {(updateProductPrice) => (
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h2">{props.product.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{props.product.description}</Typography>
          </Grid>
          <Grid item>
          <TextField fullWidth label="Product price" type="text" value={props.price} onChange={props.handleInputChange('price')} margin="normal"/>
          </Grid>
          <Grid item style={{ margin: '1rem 0' }}>
            <Grid container direction="row">
              {props.product.category.map((category) => (
                <Chip label={category} />
              ))}
            </Grid>
          </Grid>
          <Grid item style={{marginTop: '2rem'}}>
            <Button onClick={() => props.onformSubmit(updateProductPrice)} variant="contained">Update Product Price</Button>
          </Grid>
        </Grid>
      )
      }
      </Mutation>
    )
}

export default UpdateProduct;