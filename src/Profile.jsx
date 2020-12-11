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
import AccountForm from './AccountForm'

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id: this.props.match.params.customer_id,
      customer: null,
      account: null,
      addresses: [],
      creditCards: [],
      email: null,
      firstname: null,
      lastname: null,
      orderHistory: [],
      password: null,
      phoneNumber: null
    }
  }

  componentDidMount() {
    Axios.get(config.host + "/customer/" + this.state.customer_id)
      .then(response => {
        const customer = response.data;
        this.setState({
          customer: customer,
          account: customer.accountName,
          addresses: customer.addressList,  
          creditCards: customer.creditCards,
          email: customer.email,
          firstname: customer.firstName,
          lastname: customer.lastName,
          orderHistory: customer.orderHistory,
          password: customer.password,
          phoneNumber: customer.phoneNumber
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
        console.log(response.data)
      })
      .catch (error => {
        console.log(error)
      })
  }

  render() {
    return (
      <>
      <Header />
      <Container className="profile">
        <h1 style={{textAlign: 'center'}}>Hi, {this.state.firstname}!</h1>
        <br/>
        <Tab.Container defaultActiveKey="#info">
          <Row>
            <Col sm={4}>
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
                  <Row>
                    <Col><h2>My Account</h2></Col>
                    <Col><Button>Edit</Button></Col>
                  </Row>
                  
                  <hr/>
                  <div>
                  <Row>
                    <Col>
                      <h5>Account Name: </h5>
                      <p>{this.state.account}</p>
                    </Col>
                    <Col>
                      <h5>Phone Number: </h5>
                      <p>{this.state.phoneNumber}</p>
                    </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                      <h5>First Name: </h5>
                      <p>{this.state.firstname}</p>
                    </Col>
                    <Col>
                      <h5>Last Name: </h5>
                      <p>{this.state.lastname}</p>
                    </Col>
                  </Row>
                  <br/>
                  <Row>
                    <Col>
                      <h5>Email: </h5>
                      <p>{this.state.email}</p>
                    </Col>
                    <Col>
                      <Row>
                        <Col sm={4}><h5>Password: </h5></Col>
                        <Col sm={8}>
                        <input type="checkbox" id="hide" onClick={(event) => this.showPassword(event)}/>{' '}
                        <label htmlFor="hide">Show Password</label>
                        </Col>
                      </Row>
                      <p id="password">********</p>
                    </Col>
                  </Row>
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="#address">
                  <br/>
                  <h2>My Address</h2>
                  <br/>
                  <Row>
                  {
                    this.state.addresses.map((address, index) => {
                      return (
                        <Card style={{ width: '18rem', margin: '5px' }}>
                          <Card.Body>
                            <Card.Title>Address {index + 1}</Card.Title><br/>
                            <Card.Text>
                              <p>Address 1: {address.address1}</p>
                              <p>Address 2: {address.address2}</p>
                              <p>City: {address.city}</p>
                              <p>State: {address.state}</p>
                              <p>Zip: {address.zip}</p>
                            </Card.Text>
                            <Card.Link href="#">Edit Address</Card.Link>
                            <Card.Link href="#">Delete Address</Card.Link>
                          </Card.Body>
                        </Card>
                      )
                    })
                  }
                  
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
                        <Card style={{ width: '18rem', margin: '5px' }}>
                          <Card.Body>
                            <Card.Title>Card {index + 1}</Card.Title><br/>
                            <Card.Text>
                              <p>Card Number: {card.cardNumber}</p>
                              <p>First Name: {card.firstName}</p>
                              <p>Last Name: {card.lastName}</p>
                              <p>Exp Date: {card.expDate.year}-{card.expDate.month}</p>
                            </Card.Text>
                            <Card.Link href="#">Edit Card</Card.Link>
                            <Card.Link href="#">Delete Card</Card.Link>
                          </Card.Body>
                        </Card>
                      )
                    })
                  }
                  
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

<br/>
        {/* <AccountForm /> */}
      </Container>
      </>
    )
  }
}