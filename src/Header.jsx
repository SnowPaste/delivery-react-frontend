import React from 'react'
import './index.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customer_id: "5f9fc4461ec87e4d750e958c"
    }
  }

  render () {
    return (
      <>
      <Navbar bg="dark" variant="dark" style={{marginBottom: "20px"}}>
        <Navbar.Brand href="/">SnowPaste Delivery</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/restaurants">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href={`/customer/${this.state.customer_id}/profile`}><FontAwesomeIcon icon={faUserCircle} size="md"/> My Profile</Nav.Link>
          <Nav.Link href={`/customer/${this.state.customer_id}/cart`}><FontAwesomeIcon icon={faShoppingCart} size="md"/> Cart</Nav.Link>
        </Nav>
      </Navbar>
      </>
    )
  }
}
