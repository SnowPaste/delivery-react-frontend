import React from 'react'
import Axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import Header from './Header'
import Container from 'react-bootstrap/Container'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: "http://localhost:5000",
      restaurants: []
    }
  }
  
  componentDidMount() {
    Axios.get(this.state.host + '/restaurants')
      .then(res => {
        this.setState({
          restaurants: res.data
        })
      })
      .catch (error => {
        console.log(error)
      })
  }

  render() {
    return (
      <>
        <Header/>
        <Container>
          <h1>Restaurant List</h1>
          <hr/>
          {
            this.state.restaurants.map((restaurant, index) => {
              return (
                <div className="restaurantList" key={index}>
                  <Link to={{pathname: `/restaurant/${restaurant.id}`}}><h3>{restaurant.name}</h3></Link>
                  <h6>{restaurant.cuisine} {restaurant.rating}</h6>
                  <br/>
                </div>
              )
            })
          }
        </Container>
      </>
    )
  }
}

export default withRouter(Home)