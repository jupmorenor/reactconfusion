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
import  { postComment, postFeedback, fetchComments, fetchDishes, fetchPromotions, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }    
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromotions: () => dispatch(fetchPromotions()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchLeaders();
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
        leader={this.props.leaders.leaders.filter((leaders) => leaders.featured )[0] }
        leaderLoading={this.props.leaders.isLoading}
        leaderError={this.props.leaders.errMess}
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
          postComment={this.props.postComment}
        />
      );
    }
    
    return (
      <>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/contactus" component={ () => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} /> } />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Main));
