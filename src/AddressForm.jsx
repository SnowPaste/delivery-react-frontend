import React from'react'
import Axios from 'axios'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import config from './config'

export default class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: null,
      address2: null,
      city: null,
      state: null,
      zip: null,
    }
  }

  handleChange (key, event) {
    this.setState({
      [key]: event.target.value
    })
  }

  handleSubmit () {
    if (this.props.func === "update") {
      Axios.put(config.host + '/customer/' + this.props.customer_id + '/update_address/' + this.props.address_id, {
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    })
      .then(response => {
        window.location.reload();
      })
      .catch (error => {
        console.log(error)
      })
    }
    if (this.props.func === "add") {
      Axios.put(config.host + '/customer/' + this.props.customer_id + '/add_address', {
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      })
        .then(response => {
          window.location.reload();
        })
        .catch (error => {
          console.log(error)
        })
    }
    
    
  }

  handleClear (event) {
    this.setState({
      address1: null,
      address2: null,
      city: null,
      state: null,
      zip: null,
    })
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }

  render() {
    return (
      <Form ref="address-form">
        <Row>
          <Col>
            <FormControl placeholder="Address 1" onChange={(event) => {this.handleChange('address1', event)}} />
          </Col>
          <Col>
            <FormControl placeholder="Address 2" onChange={(event) => {this.handleChange('address2', event)}}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <FormControl placeholder="City" onChange={(event) => {this.handleChange('city', event)}}/>
          </Col>
          <Col>
              <FormControl placeholder="State" onChange={(event) => {this.handleChange('state', event)}}/>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
              <FormControl type="zip" placeholder="Zip" onChange={(event) => {this.handleChange('zip', event)}}/>
          </Col>
          <Col>
          </Col>
        </Row>
        <br/>
        <Row className="justify-content-md-center">
          <Col><Button onClick={() => this.handleSubmit()}>Save</Button></Col>
          <Col><Button onClick={(event) => this.handleClear(event)}>Clear</Button></Col>
        </Row>
      </Form>
    )
  }
}