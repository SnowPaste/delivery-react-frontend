import Axios from 'axios'
import React from 'react'
import Header from './Header'
import './index.css'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

export default class Restaurant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      host: "http://localhost:5000",
      restaurant: null,
      menu: [],
      error: null,
      name: ""
    }
  }

  componentDidMount() {
    const restaurant_id = this.props.match.params.restaurant_id;
    if (restaurant_id !== undefined) {
      Axios.get(this.state.host + '/restaurant/' + restaurant_id)
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
    Axios.put(this.state.host + '/customer/5f9fc4461ec87e4d750e958c/add_dish/' + item.id)
      .then(response => {
        if (typeof(response.data) === 'string') {
          this.setState({error: response.data})
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
        <h1>{this.state.name}</h1>
        <hr/>
        <Alert variant="danger" style={this.state.error === null ? {display: "none"} : {display: "block"}}>{this.state.error}</Alert>
        <br/>
        <ListGroup>
        {
            this.state.menu.map(item => {
            return (
              <ListGroupItem key={item.id}>
                <h4>{item.name} ${item.price} <button value={item} onClick={() => this.addToCart(item)}>Add to cart</button></h4>
                <p>{item.description}</p>
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