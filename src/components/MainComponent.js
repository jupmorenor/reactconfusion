import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './MenuComponent'
import DishDetail from './DishdetailComponent'
import { DISHES } from '../data/dishes'

class Main extends Component {
    constructor(props) {
        super();
        this.state = {
            dishes: DISHES,
            selectedDish: null
        }
    }

    onDishSelect(dishId) {
        this.setState({
            selectedDish: dishId
        })
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
          <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        </header>
        <DishDetail 
            dish={this.state.dishes.filter((dish) =>
                dish.id === this.state.selectedDish
            )[0]
            }
        />
  
      </>
    );
  }
}

export default Main;
