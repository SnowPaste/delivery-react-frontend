import React from 'react'
import Axios from 'axios'
import Header from './Header'
import './index.css'
import config from './config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

export default class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customer_id: this.props.match.params.customer_id,
      cart: null,
      tip: 0,
      total: 0,
      items: [],
      rawTotal: 0,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zip: null
    }
  }

  componentDidMount () {
    Axios.get(config.host + '/customer/' + this.state.customer_id + '/get_cart')
      .then(response => {
        let cart = response.data;
        let raw = 0;
        cart.items.map(item => raw += item.price)
        this.setState({
          cart: cart,
          tip: cart.tip,
          total: parseFloat(cart.totalPrice).toFixed(2),
          items: cart.items,
          rawTotal: raw,
        })
      })
      .catch (error => {
        console.log(error)
      }) 
  }

  deleteItem (item) {
    Axios.put(config.host + '/customer/' + this.state.customer_id + '/remove_dish/' + item.id)
      .then (response => {
        window.location.reload();
      })
      .catch (error => {
        console.log(error)
      })
  }

  emptyCart () {
    Axios.put(config.host + '/customer/' + this.state.customer_id + '/empty_cart')
      .then(response => {
        window.location.reload()
      })
      .catch (error => {
        console.log(error)
      })
  }

  setTip (amount) {
    Axios.put(config.host + '/customer/' + this.state.customer_id + '/set_tip', {tip: amount})
      .then(response => {
        window.location.reload()
      })
      .catch (error => {
        console.log(error)
      })
  }

  handleClick (amount) {
    this.setTip(parseFloat(amount).toFixed(2))
  }

  handleChange (key, event) {
    if (key === 'tip') {
      const tip = event.target.value !== "" ? parseFloat(event.target.value).toFixed(2) : event.target.value;
      if (isNaN(tip)) {
        alert("Please input a valid number of tip!")
      } else {
        this.setState({
          tip: tip
        })
      }
    } else {
      this.setState({
        [key]: event.target.value
      })
    }
    
  }

  handleApply () {
    this.setTip(this.state.tip)
  }

  placeOrder (event) {
    if (this.state.cart.items.length === 0) {
      alert("Your cart is still empty!");
    } else {
      const restaurant_id = this.state.cart.items[0].restaurantId;
      Axios.post(config.host + '/customer/' + this.state.customer_id + '/make_order/' + restaurant_id, {
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      })
        .then(response => {
          const order_id = response.data.id;
          this.props.history.push('/order/' + order_id);
        })
    }
  }

  render() {
      return (
      <>
        <Header/>
        <Container>
          <Row>
            <Col sm={10}>
              <h1>My Cart</h1>
            </Col>
            <Col sm={2} style={{textAlign: "right"}}>
              <Button variant="danger" onClick={() => this.emptyCart()}>Empty Cart</Button>
            </Col>
          </Row>
          
          <ListGroup>
          {
            this.state.items.map((item) => {
              return (
                <ListGroupItem key={item.id}>
                <Row>
                  <Col style={{padding: "10px", textAlign: "center"}} sm={1}><FontAwesomeIcon className="delete-icon" icon={faMinusCircle} size="lg" value={item} onClick={() => this.deleteItem(item)} /></Col>
                  <Col style={{paddingTop: "5px"}} sm={11}><h3>{item.name} x1</h3></Col>
                </Row>
                </ListGroupItem>
              )
            })
          }
          </ListGroup>
          <br/>
          <div className="tip">
            <Row>

            
            <Col sm={3}><h3>Tip amount: ${this.state.tip}</h3></Col>
            <Col sm={9}>
              <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                <ButtonGroup className="mr-2" aria-label="First group">
                  <Button variant="secondary" onClick={() => this.handleClick(0.15 * this.state.rawTotal)}>15%</Button>{' '}
                  <Button variant="secondary" onClick={() => this.handleClick(0.18 * this.state.rawTotal)}>18%</Button>{' '}
                  <Button variant="secondary" onClick={() => this.handleClick(0.2 * this.state.rawTotal)}>20%</Button>
                </ButtonGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="btnGroupAddon">Other:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type="text"
                    placeholder="Tip Amount"
                    onChange={event => this.handleChange('tip', event)}
                  />
                </InputGroup>
                <Button style={{marginLeft: "5px"}} onClick={() => this.handleApply()}>Apply</Button>
              </ButtonToolbar>
            </Col>
            </Row>
          </div>
          
          <hr/>
          <h3>Total: ${this.state.total}</h3>
          <br/>
          <Form>
            <h3>Enter your address:</h3>
              <Row>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Address 1:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="address1" type="text" onChange={event => this.handleChange('address1', event)}/>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Address 2:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="address2" type="text" onChange={event => this.handleChange('address2', event)}/>
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">City: </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl id="city" type="text" onChange={event => this.handleChange('city', event)}/>
                </InputGroup>
                </Col>
                <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">State: </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl id="state" type="text" onChange={event => this.handleChange('state', event)}/>
                </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Zip: </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl id="zip" type="text" onChange={event => this.handleChange('zip', event)}/>
                </InputGroup>
                </Col>
                <Col></Col>
              </Row>
          </Form>
          <br/>
          <Button onClick={(event) => this.placeOrder(event)}>Place Order!</Button>
        </Container>
        
      </>
    )
  }
}