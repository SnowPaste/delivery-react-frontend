import React from 'react'
import Axios from 'axios'
import Header from './Header'
import Container from 'react-bootstrap/Container'
import config from './config'

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_id: this.props.match.params.order_id,
      order: null,
      createTime: null,
      restaurant: null,
      driver: null,
      est: null,
      status: null,
    }
  }

  componentDidMount() {
    Axios.get(config.host + "/order/get_an_order/" + this.state.order_id)
      .then(response => {
        const order = response.data;
        this.setState({
          order: order,
          createTime: order.createTime,
          restaurant: order.restaurant.name,
          driver: order.driver.firstName + " " + order.driver.lastName,
          est: order.estDeliverTime.hour + ":" + order.estDeliverTime.minute,
          status: order.status,
        })
      })
  }

  render() {
    return (
      <>
      <meta httpEquiv="refresh" content="10"></meta>
      <Header />
      <Container>
        <h1>Your Order</h1>
        <hr/>
        <h3>Status: {this.state.status}</h3>
        <h5>From: {this.state.restaurant}</h5>
        <h5>Estimated Deliver: {this.state.est}</h5>
        <h5>Your Driver: {this.state.driver}</h5>
      </Container>
      </>
    )
  }
}