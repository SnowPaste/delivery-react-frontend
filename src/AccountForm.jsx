import React from'react'
import Axios from 'axios'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import config from './config'

export default class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: null,
      phoneNumber: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    }
  }

  handleChange (key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  handleSubmit () {
    if (this.validateEmail(this.state.email) && this.validateString(this.state.firstName) && this.validateString(this.state.lastName) && this.validatePhone(this.state.phoneNumber)) {
      if (this.props.func === 'update') {
        Axios.put(config.host + "/customer/" + this.props.id + "/update_customer",
        {
          accountName: this.state.accountName,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          phoneNumber: this.state.phoneNumber,
        })
      }
    }
  }

  validateEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) || email === null) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  validateString(string) {
    if (/^[A-Za-z_]+$/.test(string) || string === null) {
      return true;
    }
    alert("You have entered an invalid name! Only letters and underscores are allowed");
    return false;
  }

  validatePhone(number) {
    if (/^\d{10}$/.test(number) ||  number === null) {
      return true;
    }
    alert("You have entered an invalid phone number!");
    return false;
  }

  handleClear (event) {
    this.setState({
      accountName: null,
      phoneNumber: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    })
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }

  render() {
    return (
      <Form ref="account-form">
        <Row>
          <Col>
            <FormControl placeholder="Account Name" onChange={(event) => {this.handleChange('accountName', event)}} />
          </Col>
          <Col>
            <FormControl placeholder="Phone Number" onChange={(event) => {this.handleChange('phoneNumber', event)}}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <FormControl placeholder="First Name" onChange={(event) => {this.handleChange('firstName', event)}}/>
          </Col>
          <Col>
              <FormControl placeholder="Last Name" onChange={(event) => {this.handleChange('lastName', event)}}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
              <FormControl type="email" placeholder="Email" onChange={(event) => {this.handleChange('email', event)}}/>
          </Col>
          <Col>
              <FormControl type="password" placeholder="Password" onChange={(event) => {this.handleChange('password', event)}}/>
          </Col>
        </Row>
        <br/>
        <Row className="justify-content-md-center">
          <Col xs={1}><Button onClick={() => this.handleSubmit()}>Submit</Button></Col>
          <Col xs={1}><Button onClick={(event) => this.handleClear(event)}>Clear</Button></Col>
        </Row>
      </Form>
    )
  }
}