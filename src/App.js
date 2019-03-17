import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <Layout>
          <Route path='/burgerBuilder' component={BurgerBuilder}></Route>
          <Route path='/checkout' component={Checkout}></Route>
        </Layout>      
      </BrowserRouter>        
      </div>
    );
  }
}

export default App;
