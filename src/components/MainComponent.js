import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from "./DishdetailComponent";
import { connect } from 'react-redux';
import  { addComment, fetchComments, fetchDishes, fetchPromotions } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }    
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromotions: () => dispatch(fetchPromotions()),
  fetchComments: () => dispatch(fetchComments()),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
})

class Main extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromotions();
  }

  render() {
    const HomePage = () => {
      return <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured )[0] }
        dishesLoading={this.props.dishes.isLoading}
        dishesError={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured )[0] }
        promotionLoading={this.props.promotions.isLoading}
        promotionError={this.props.promotions.errMess}
        leader={this.props.leaders.filter((leader) => leader.featured )[0] }
      />
    }

    const DishWithId = ({match}) => {
      return (
        <DishDetail 
          dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId))[0] }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId ===  parseInt(match.params.dishId)) }  
          commentsErr={this.props.comments.errMess}
          addComment={this.props.addComment}
        />
      );
    }
    
    return (
      <>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/contactus" component={ () => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} /> } />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Main));
