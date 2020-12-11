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
                  <h2>My Address</h2>
                </Tab.Pane>
                <Tab.Pane eventKey="#cards">
                  <h2>My Credit Cards</h2>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        
      </Container>
      </>
    )
  }
}