import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from '../src/containers/Checkout/Orders';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/orders' exact component={Orders}></Route>
            <Route path='/checkout' component={Checkout}></Route>
            <Route path='/' exact component={BurgerBuilder}></Route>
          </Switch>
        </Layout>      
      </BrowserRouter>        
      </div>
    );
  }
}

export default App;
