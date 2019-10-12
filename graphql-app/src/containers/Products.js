import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';

import ProductList from '../components/Products/ProductsList';
import ViewProduct from '../components/Products/ViewProduct';
import AddProduct from '../components/Products/AddProducts';
import UpdateForm from '../components/Products/UpdateProduct';

/**
 * @todo Could not implement Currency handling
 *
 * @class Products
 * @extends {Component}
 */
class Products extends Component {
  state = {
    currentView: 'list',
    allCategories: [],
    categoriesSet: false,
    currentProduct: null,
    newProduct: {
      name: '',
      description: '',
      price: '',
      category: []
    }
  };

  /**
   * @function handleInputChange Updates state variables with user input
   *
   * @todo Would have made this a function component with only the form visible and all the data management in a separate
   *      container component handling Admin functions
   */
  handleInputChange = (field) => (event) => {
    let updatedProduct = { ...this.state.newProduct };
    updatedProduct[field] = event.target.value;
    this.setState({
      newProduct: updatedProduct
    });
  }

  /**
  * @function updateCategoryList Updates the list Category chips provided to the user for filtering of products
  * 
  * @todo Find a better way to update state from GraphQl query as this is called from the child 
  *      components render which is very hacky
  * 
  * @argument [Array] list Array of categories collected from Products List
  * @argument [String] Name of component it is called from
  *
  */
  updateCategoryList = (list, fromSource) => {
    if (!this.state.categoriesSet || (fromSource && fromSource === 'addproduct')) {
      this.setState((prevState, props) => ({ allCategories: list, categoriesSet: true }));
    }
  }

  /**
   *  @function changeCurrentView Basic view swapping normally handled by nested Routes
   *
   */
  changeProductView = (newView, product) => {
    if (newView === 'single' || newView === 'update') {
      this.setState((prevState) => ({ currentView: newView, currentProduct: product }))
    } else if (newView === 'list') {
      this.setState((prevState) => ({ currentView: newView, currentProduct: null }));
    }
  }

  /**
   *  @function addProductSubmitHandler Calls the mutate function after setting categories correctly as an array 
   *      and converting price to Int
   *
   *  @args [Function] mutate function
   */
  addProductSubmitHandler = (addProduct) => {
    const { name, description } = this.state.newProduct;
    const price = parseInt(this.state.newProduct.price);
    const category = this.state.newProduct.category.split(',');
    addProduct({
      variables: { name, description, price, category }
    }).then((res) => {
      let updatedCatList = [...this.state.allCategories];
      category.filter((elem) => {
        if (this.state.allCategories.findIndex((cat) => cat === elem) < 0) {
          updatedCatList.push(elem);
        }
      });
      if (updatedCatList.length > this.state.allCategories.length) {
        this.updateCategoryList(updatedCatList, 'addproduct');
      }
      let clearProduct = {
        name: '',
        description: '',
        price: '',
        category: []
      };
      this.setState({ newProduct: clearProduct });
    });
  }

  /**
   *  @function updateSubmitHandler Calls the mutate function after setting categories correctly as an array 
   *      and converting price to Int
   *
   *  @args [Function] mutate function
   */

  updateSubmitHandler = (updateProductPrice) => {
    const price = parseInt(this.state.newProduct.price);
    const id = this.state.currentProduct.id;
    updateProductPrice({
      variables: { id, price }
    }).then((res) => {
      let clearProduct = {
        name: '',
        description: '',
        price: '',
        category: []
      };
      this.setState({ newProduct: clearProduct, currentView: 'list' });
    })
  }

  render() {
    return (
      <Grid container direction="column" alignItems="center">
        {/* Admin section only visible to Admin role */}
        <Grid item xs md={8}>
          {this.props.role === 'Admin' ?
            this.state.currentView === 'update' ?
              <UpdateForm product={this.state.currentProduct}
                price={this.state.newProduct.price}
                handleInputChange={this.handleInputChange} onformSubmit={this.updateSubmitHandler} />
              :
              (
                <AddProduct
                  product={this.state.newProduct}
                  handleInputChange={this.handleInputChange}
                  onformSubmit={this.addProductSubmitHandler}
                />
              ) : null}
        </Grid>
        <Grid item>
          {this.state.currentView === 'list' ? <ProductList categories={this.state.allCategories}
            updateCategoryList={this.updateCategoryList}
            currentCategories={this.state.currentCategories}
            categoriesSet={this.state.categoriesSet}
            changeCurrentView={this.changeProductView} /> : this.state.currentView === 'single' ? <ViewProduct
              product={this.state.currentProduct}
              changeCurrentView={this.changeProductView} /> : null}

        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.appReducer.username,
    role: state.appReducer.role,
    token: state.appReducer.token,
    currency: state.appReducer.currency
  }
};

export default connect(mapStateToProps)(Products);