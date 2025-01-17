import React from 'react'
import Axios from 'axios'
import Header from './Header'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
import config from './config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'

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
      deliver: null,
      show: false,
      target: null,
      driver_phone: null,
      driver_car: null,
      driver_licence: null,
      address: null,
      timer: null
    }
  }

  componentDidMount() {
    this.getOrder();
    this.timer = setInterval(() => this.getOrder(), 3000);
  }

  getOrder () {
    if (this.state.status === "DELIVERED") {
      clearInterval(this.timer);
    }
    Axios.get(config.host + "/order/get_an_order/" + this.state.order_id)
      .then(response => {
        const order = response.data;
        let address = order.address.address1 + ", " + order.address.address2 + ", " + order.address.city + ", " + order.address.state + ", " + order.address.zip
        this.setState({
          order: order,
          createTime: order.createTime.hour + ":" + order.createTime.minute,
          restaurant: order.restaurant.name,
          driver: order.driver.firstName + " " + order.driver.lastName,
          driver_phone: order.driver.phoneNumber,
          driver_car: order.driver.carMaker + " " + order.driver.carModel,
          driver_licence: order.driver.carLicence,
          est: order.estDeliverTime.hour + ":" + order.estDeliverTime.minute,
          status: order.status,
          address: address
        })
        if (order.deliverTime !== null) {
          this.setState({
            deliver: order.deliverTime.hour + ":" + order.deliverTime.minute
          })
        }
      })
  }

  handleClick (event) {
    this.setState({
      show: !this.state.show,
      target: event.target
    })
  }

  render() {
    
    return (
      <>
      <Header />
      <Container>
        <h1>Your Current Order</h1>
        <br/>
        <ListGroup>
          <ListGroup.Item><h3>Status: {this.state.status}</h3></ListGroup.Item>
          <ListGroup.Item><h5>Restaurant: {this.state.restaurant}</h5></ListGroup.Item>
          <ListGroup.Item><h5>Address: {this.state.address}</h5></ListGroup.Item>
          <ListGroup.Item><h5>Order Create: {this.state.createTime}</h5></ListGroup.Item>
          <ListGroup.Item><h5>Estimated Deliver: {this.state.est}</h5></ListGroup.Item>
          <ListGroup.Item><h5>Deliver Time: {this.state.deliver}</h5></ListGroup.Item>
          <ListGroup.Item><h5>Your Driver: {this.state.driver} <FontAwesomeIcon className="plus-icon" icon={faInfoCircle} size="sm" onClick={(event)=> this.handleClick(event)}/></h5></ListGroup.Item>
        </ListGroup>

        <Overlay
          show={this.state.show}
          target={this.state.target}
          placement="right"
          container={document.getElementById("click")}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Title as="h3">Driver Info</Popover.Title>
            <Popover.Content>
              <ListGroup variant="flush">
                <ListGroup.Item>Phone: {this.state.driver_phone}</ListGroup.Item>
                <ListGroup.Item>Car Model: {this.state.driver_car}</ListGroup.Item>
                <ListGroup.Item>Licence Plate: {this.state.driver_licence}</ListGroup.Item>
              </ListGroup>
            </Popover.Content>
          </Popover>
        </Overlay>
        
      </Container>
      </>
    )
  }
}