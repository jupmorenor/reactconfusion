import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../data/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len); 

class CommentForm extends Component {
    constructor(props) {
        super();
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleComment(comment) {
        this.props.addComment(this.props.dishId, comment.rating, comment.author, comment.comment)
        this.toggleModal();
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(comment) => this.handleComment(comment)} >
                            <Row className="form-group" >
                                <Col className="col-12">
                                    <Label for="rating" >Rating: </Label>
                                    <Control.select model=".rating" className="form-control" id="rating" name="rating" >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group" >
                                <Col>
                                    <Label for="author" >Your name: </Label>
                                    <Control.text model=".author" className="form-control" id="author" name="author" placeholder="Your name" 
                                    validators={{minLength: minLength(3), maxLength: maxLength(15)}} />
                                    <Errors className="text-danger" model=".author" show="touched"
                                    messages={{minLength: "Must be greater than 2 characters", maxLength: "Must be 15 characters or less"}} />
                                </Col>
                            </Row>
                            <Row className="form-group" >
                                <Col>
                                    <Label for="comment" >Comment</Label>
                                    <Control.textarea model=".comment" className="form-control" id="comment" name="comment" rows="6" />
                                </Col>
                            </Row>
                            <Row className="form-group" >
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderComments({comments, addComment, dishId}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled" >
            {
                comments.map((comment) => {
                    return (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>--{comment.author}, {
                                new Intl.DateTimeFormat('en-US',  {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))
                                } 
                            </p>
                        </li>
                    );
                })
            }
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12" >
                        <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">   
                    <RenderDish dish={props.dish} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    }
        
}

export default DishDetail;
