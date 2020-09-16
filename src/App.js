import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './components/Menu'
import './App.css';
import { DISHES } from './data/dishes'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      dishes: DISHES
    }
  }
  render() {
    return (
      <>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Confusion</NavbarBrand>
          </div>
        </Navbar>
        <header className="jumbotron">
          <Menu dishes={this.state.dishes} />
        </header>
  
      </>
    );
  }
}

export default App;
