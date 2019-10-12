import React from 'react';
import { Grid, Typography, Button, Chip, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { GET_ALL_PRODUCTS } from '../../graphql/queries';

export const ProductsList = (props) => {
  let catList = [];

  return (
    <Grid container direction="column">
      {props.categoriesSet ? (<Grid item style={{ margin: '1rem 0' }}>
        <Grid container direction="row" spacing={16}>
        <Grid item><Typography variant="headline"> Filter by categories : </Typography></Grid>
        <Grid item><Chip label="All" onClick={() => props.data.refetch({ category: null })} /></Grid>
          {props.categories.map((category) => (
            <Grid item key={category} >
            <Chip label={category} onClick={() => props.data.refetch({ category })} />
            </Grid>
          ))}
        </Grid>
      </Grid>) : null}
      <Grid item>
        <Grid container direction="row" spacing={40}>
          {props.data ? props.data.loading || props.data.error ? <Typography variant="h3">Loading product...</Typography> : (props.data.allProducts.map((product, index) => {
            product.category.filter((pCat) => {
              if (catList.findIndex((elem) => elem === pCat) < 0) {
                catList.push(pCat);
              }
            });
            if (index === (props.data.allProducts.length - 1) && !props.categoriesSet) {
              props.updateCategoryList(catList);
            }
            return (<Grid item xs={12} md={4} key={product.id}>
              <Paper style={{ padding: '1rem' }}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h3">{product.name}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{product.description}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2">{product.price}</Typography>
                  </Grid>
                  <Grid item style={{ margin: '1rem 0' }}>
                    <Grid container direction="row">
                      {product.category.map((category) => (
                        <Chip key={category} label={category} onClick={() => props.data.refetch({ category })} />
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={() => props.changeCurrentView('single', product)}>View Details</Button>
                    <Button variant="contained" color="primary" style={{ marginLeft: '1rem' }}>Buy Now</Button>
                  </Grid>
                  <Grid item>
                  {props.role === 'Admin' ? <Button variant="contained" color="primary" onClick={() => props.changeCurrentView('update', product)}>Update Product Price</Button> : null}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>)
          })) : <Typography variant="h3">No products...</Typography>}
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => {
  return {
    role: state.appReducer.role
  }
};

const ProductsListWithGQL = graphql(GET_ALL_PRODUCTS,{
  options: (props) => ({
    variables: props.currentCategory
  }),
})(ProductsList);

export default connect(mapStateToProps)(ProductsListWithGQL);