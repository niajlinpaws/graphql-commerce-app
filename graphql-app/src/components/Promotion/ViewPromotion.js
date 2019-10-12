import React from 'react';
import { Query } from 'react-apollo';
import { Paper, Typography, Divider } from '@material-ui/core';
import { GET_PROMOTION } from '../../graphql/queries';

const ViewPromotionBanner = (props) => {
  return (
    <Query query={GET_PROMOTION}>
    {({loading, error, data}) => {
      if(loading) return <Typography variant="h4">Loading promotion..</Typography>;
      if (error)  return <Typography variant="caption">Error loading products..</Typography>;
      
      let discount = data.getPromotion.discount;
      let price = data.getPromotion.product.price;
      let discountedPrice =  price - (price * (discount/100));
      return (
        <Paper style={{padding: '1.5rem', margin: '2rem 0', backgroundColor: 'pink'}}>
          <Typography variant="h3">{data.getPromotion.title}</Typography>
          <Divider />
          <Typography variant="body1">Get {data.getPromotion.product.name} at {data.getPromotion.discount}% discount. Only for  {data.getPromotion.duration} day.</Typography>
          <Typography variant="h5">You pay only {discountedPrice} instead of {price}. Hurry and buy today!!</Typography>
        </Paper>
      )      
    }}
    </Query>
  )
};

export default ViewPromotionBanner;