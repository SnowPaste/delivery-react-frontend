import Axios from 'axios'
import React from 'react'
import Header from './Header'
import './index.css'
import config from './config'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartPlus} from '@fortawesome/free-solid-svg-icons'
import Rating from 'react-rating'

export default class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: null,
      menu: [],
      error: null,
      name: "",
      success: null,
    }
  }

  componentDidMount() {
    const restaurant_id = this.props.match.params.restaurant_id;
    if (restaurant_id !== undefined) {
      Axios.get(config.host + '/restaurant/' + restaurant_id)
        .then(response => {
          const restaurant = response.data;
          this.setState({
            restaurant: restaurant,
            name: restaurant.name,
            menu: restaurant.menu
          })
        })
        .catch (error => {
          console.log(error)
        });
    }
  }

  addToCart(item) {
    this.setState({
      success: null,
      error: null
    })
    Axios.put(config.host + '/customer/5f9fc4461ec87e4d750e958c/add_dish/' + item.id)
      .then(response => {
        if (typeof(response.data) === 'string') {
          this.setState({error: response.data})
        } else {
          this.setState({success: true})
        }
      })
      .catch (error => {
        console.log(error)
      })
  }
 
  render() {
    return (
    <> 
      <Header/>
      <Container>
        <h1 style={{textAlign: "center"}}>{this.state.name}</h1>
        <hr/>
        <Alert variant="danger" style={this.state.error === null ? {display: "none"} : {display: "block"}}>{this.state.error}</Alert>
        <Alert variant="success" style={this.state.success === null ? {display: "none"} : {display: "block"}}>Added to cart!</Alert>
        <br/>
        <ListGroup style={{width: "70vw", paddingLeft: "5vw"}}>
        {
            this.state.menu.map(item => {
            return (
              <ListGroupItem key={item.id}>
                <Row>
                  <Col sm={5}><h4>{item.name}</h4></Col>
                  <Col sm={3}><Rating emptySymbol={<img alt="empty" src="/star-empty.png" width="20px" height="20px"/>} fullSymbol={<img alt="full" src="/star-full.png" width="20px" height="20px"/>} initialRating={item.rating} fractions="10" readonly/></Col>
                  <Col sm={2}><h5>${item.price}</h5></Col>
                  <Col sm={2}><FontAwesomeIcon className="plus-icon" icon={faCartPlus} size="lg" onClick={() => this.addToCart(item)}/></Col>
                </Row>
                <Row style={{paddingLeft: "1vw"}}>{item.description}</Row>
              </ListGroupItem>
            )
          })
        }
        </ListGroup>
      </Container>
    </>
  )
  }
 
}