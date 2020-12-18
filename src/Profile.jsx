import React from 'react'
import Axios from 'axios'
import config from './config'
import Header from './Header'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import AddressForm from './AddressForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import { FormControl } from 'react-bootstrap'


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: this.props.match.params.customer_id,
      customer: null,
      accountName: null,
      addresses: [],
      creditCards: [],
      email: null,
      firstName: null,
      lastName: null,
      orderHistory: [],
      password: null,
      phoneNumber: null,
      cart: null,
      show: false,
      onEdit: null,
      onEditCard: null,
      showCard: false,
      onEditAddress: null,
      showAddress: false
    }
  }

  componentDidMount() {
    Axios.get(config.host + "/customer/" + this.state.customer_id)
      .then(response => {
        const customer = response.data;
        this.setState({
          customer: customer,
          accountName: customer.accountName,
          addresses: customer.addressList,  
          creditCards: customer.creditCards,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          orderHistory: customer.orderHistory,
          password: customer.password,
          phoneNumber: customer.phoneNumber,
          cart: customer.cart
        })
      })
  }

  showPassword (event) {
    if (event.target.checked === true) {
      document.getElementById("password").innerHTML = this.state.password;
    } else {
      document.getElementById("password").innerHTML = "********";
    }
  }

  deleteCard(id) {
    Axios.delete(config.host + '/customer/' + this.state.customer_id + '/delete_card/' + id)
      .then(response => {
        window.location.reload();
      })
      .catch (error => {
        console.log(error)
      })
  }

  deleteAddress(id) {
    Axios.delete(config.host + '/customer/' + this.state.customer_id + '/delete_address/' + id)
      .then(response => {
        window.location.reload();
      })
      .catch (error => {
        console.log(error)
      })
  }

  handleAccountUpdate(event) {
    if (this.validateEmail(this.state.email) && this.validateString(this.state.firstName) && this.validateString(this.state.lastName) && this.validatePhone(this.state.phoneNumber)) {
      Axios.put(config.host + "/customer/" + this.state.customer_id + "/update_customer",
      {
        accountName: this.state.accountName,
        password: this.state.password,
        addressList: this.state.addresses,
        cart: this.state.cart,
        creditCards: this.state.creditCards,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        orderHistory: this.state.orderHistory,
        phoneNumber: this.state.phoneNumber
      })
      .then(response => {
        window.location.reload();
      })
      .catch (error => {
        console.log(error)
      })
    }
  }

  validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    window.location.reload();
    return false;
  }

  validateString(string) {
    if (/^[A-Za-z_]+$/.test(string)) {
      return true;
    }
    alert("You have entered an invalid name! Only letters and underscores are allowed");
    return false;
  }

  validatePhone(number) {
    if (/^\d{10}$/.test(number)) {
      return true;
    }
    alert("You have entered an invalid phone number!");
    window.location.reload();
    return false;
  }

  handleAccountChange(event) {
    this.setState({
      [this.state.onEdit]: event.target.value
    })
  }

  render() {
    return (
      <>
      <Header />
      <Container className="profile">
        <h1 style={{textAlign: 'center'}}>Hi, {this.state.firstName}!</h1>
        <br/>
        <Tab.Container defaultActiveKey="#info">
          <Row>
            <Col sm={4}>
              <br/>
              <ListGroup>
                <ListGroup.Item action href="#info">
                  My Account
                </ListGroup.Item>
                <ListGroup.Item action href="#address">
                  My Address
                </ListGroup.Item>
                <ListGroup.Item action href="#cards">
                  My Credit Cards
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="#info">
                  <br/>
                  <h2>My Account</h2>
                  <hr/>
                  <Row>
                    <Col>
                      <h5>Account Name: 
                        <FontAwesomeIcon className="plus-icon" icon={faEdit} size="sm" onClick={()=> this.setState({show: true, onEdit: "accountName"})}/>
                      </h5>
                      <p>{this.state.accountName}</p>
                    </Col>
                    <Col>
                      <h5>Phone Number: 
                        <FontAwesomeIcon className="plus-icon" icon={faEdit} size="sm" onClick={()=> this.setState({show: true, onEdit: "phoneNumber"})}/>
                      </h5>
                      <p>{this.state.phoneNumber}</p>
                    </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                      <h5>First Name: 
                        <FontAwesomeIcon className="plus-icon" icon={faEdit} size="sm" onClick={()=> this.setState({show: true, onEdit: "firstName"})}/>
                      </h5>
                      <p>{this.state.firstName}</p>
                    </Col>
                    <Col>
                      <h5>Last Name: 
                        <FontAwesomeIcon className="plus-icon" icon={faEdit} size="sm" onClick={()=> this.setState({show: true, onEdit: "lastName"})}/>
                      </h5>
                      <p>{this.state.lastName}</p>
                    </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                      <h5>Email: 
                        <FontAwesomeIcon className="plus-icon" icon={faEdit} size="sm" onClick={()=> this.setState({show: true, onEdit: "email"})}/>
                      </h5>
                      <p>{this.state.email}</p>
                    </Col>
                    <Col>
                      <Row>
                        <Col sm={5}>
                          <h5>Password: 
                          <FontAwesomeIcon className="plus-icon" icon={faEdit} size="sm" onClick={()=> this.setState({show: true, onEdit: "password"})}/>
                          </h5>
                        </Col>
                        <Col sm={7}>
                        <input type="checkbox" id="hide" onClick={(event) => this.showPassword(event)}/>{' '}
                        <label htmlFor="hide">Show Password</label>
                        </Col>
                      </Row>
                      <p id="password">********</p>
                    </Col>
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey="#address">
                  <br/>
                  <h2>My Address</h2>
                  <br/>
                  <Row>
                  {
                    this.state.addresses.map((address, index) => {
                      return (
                        <Card border="info" key={index} style={{ width: '16rem', margin: '2px' }}>
                          <Card.Header as="h4">Address {index + 1}</Card.Header>
                          <ListGroup className="list-group-flush">
                            <ListGroupItem>Address 1: {address.address1}</ListGroupItem>
                            <ListGroupItem>Address 2: {address.address2}</ListGroupItem>
                            <ListGroupItem>City: {address.city}</ListGroupItem>
                            <ListGroupItem>State: {address.state}</ListGroupItem>
                            <ListGroupItem>Zip: {address.zip}</ListGroupItem>
                          </ListGroup>
                          <Card.Body>  
                          <Button style={{marginRight: "5px"}} onClick={() => this.setState({showAddress: true, onEditAddress: address.id})}>Edit</Button>{' '}
                          <Button variant="danger" onClick={() => this.deleteAddress(address.id)}>Delete</Button>
                          </Card.Body>
                        </Card>
                      )
                    })
                  }
                  <Card border="info" style={{ width: '16rem', margin: '2px', minHeight: '21rem' }}>
                    <Card.Body style={{textAlign: 'center', paddingTop: "55%"}}>
                    <FontAwesomeIcon className="plus-icon" icon={faPlus} size="2x" onClick={() => this.setState({showAddress: true})}/>
                    </Card.Body>
                  </Card>
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey="#cards">
                  <br/>
                  <h2>My Credit Cards</h2>
                  <br/>
                  <Row>
                  {
                    this.state.creditCards.map((card, index) => {
                      return (
                        <Card border="info" key={index} style={{ width: '16rem', margin: '2px' }}>
                          <Card.Header as="h4">Credit Card {index + 1}</Card.Header>
                          
                            <ListGroup className="list-group-flush">
                              <ListGroupItem>Card Number: {card.cardNumber}</ListGroupItem>
                              <ListGroupItem>First Name: {card.firstName}</ListGroupItem>
                              <ListGroupItem>Last Name: {card.lastName}</ListGroupItem>
                              <ListGroupItem>Exp Date: {card.expDate}</ListGroupItem> 
                            </ListGroup>
                          <Card.Body>    
                            <Button style={{marginRight: "5px"}}>Edit</Button>{' '}
                            <Button variant="danger" onClick={() => this.deleteCard(card.id)}>Delete</Button>
                          </Card.Body>
                        </Card>
                      )
                    })
                  }
                  <Card border="info" style={{ width: '16rem', margin: '2px', minHeight: '21rem' }}>
                    <Card.Body style={{textAlign: 'center', paddingTop: "55%"}}>
                    <FontAwesomeIcon className="plus-icon" icon={faPlus} size="2x"/>
                    </Card.Body>
                  </Card>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        {/* <AccountForm func="update" id={this.state.customer_id} /> */}
      <Modal show={this.state.show} onHide={() => this.setState({show: false, onEdit: null})}>
        <Modal.Header closeButton>
          <Modal.Title>Update {this.state.onEdit}:</Modal.Title>
        </Modal.Header>
        <Modal.Body><FormControl onChange={(event) => {this.handleAccountChange(event)}} /></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => this.handleAccountUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.showAddress} onHide={() => this.setState({showAddress: false, onEditAddress: null})}>
        <Modal.Header closeButton>
          <Modal.Title>Update Address:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddressForm func={this.state.onEditAddress === null ? "add" : "update"} customer_id={this.state.customer_id} address_id={this.state.onEditAddress} />
        </Modal.Body>
      </Modal>

      </Container>
      </>
    )
  }
}