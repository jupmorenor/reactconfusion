import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../data/dishes';

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
        <Header />
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail 
            dish={this.state.dishes.filter((dish) =>
                dish.id === this.state.selectedDish
            )[0]
            }
        />
        <Footer />
      </>
    );
  }
}

export default Main;
