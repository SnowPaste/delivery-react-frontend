import React from'react'
import Axios from 'axios'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>First Name:</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl aria-label="Amount (to the nearest dollar)" />
        </InputGroup>
      </>
    )
  }
}