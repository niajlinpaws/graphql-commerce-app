import React from 'react';
import { Grid, Typography, Button, Chip } from '@material-ui/core';

const viewProduct = (props) => {
  return (
      <Grid container direction="row">
      <Grid item xs={12} md={12}>
      <Button variant="outlined" onClick={() => props.changeCurrentView('list')}>Back to products list</Button>
      </Grid>
      <Grid item xs={12} md={3}>
        <img src={`https://via.placeholder.com/400x400.png/9b59b6/ffffff?text=${props.product.name}`} style={{ width: '100%' }} alt={props.product.name}/>
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h2">{props.product.name}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{props.product.description}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2">{props.product.price}</Typography>
          </Grid>
          <Grid item style={{ margin: '1rem 0' }}>
            <Grid container direction="row">
              {props.product.category.map((category) => (
                <Chip key={category} label={category} />
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" style={{ marginLeft: '1rem' }}>Buy Now</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default viewProduct;