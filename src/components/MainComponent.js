import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../data/dishes';
import { COMMENTS } from '../data/comments';
import { LEADERS } from '../data/leaders';
import { PROMOTIONS } from '../data/promotions';

class Main extends Component {
    constructor(props) {
        super();
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        }
    }

  render() {
    const HomePage = () => {
      return <Home 
        dish={this.state.dishes.filter((dish) => dish.featured )[0] } 
        leader={this.state.leaders.filter((leader) => leader.featured )[0] } 
        promotion={this.state.promotions.filter((promotion) => promotion.featured )[0] } 
      />
    }
    
    return (
      <>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default Main;
