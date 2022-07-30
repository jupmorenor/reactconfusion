import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../data/baseUrl';
import fetch from 'cross-fetch';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    }
});

// Dishes
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (err) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: err,
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
});

// Comments
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
}

export const commentsFailed = (err) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: err,
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
});

// Promotions
export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionsLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)));
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING,
});

export const promotionsFailed = (err) => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: err,
});

export const addPromotions = (promotions) => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions,
});
