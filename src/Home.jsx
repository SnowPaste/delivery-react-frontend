import React from 'react'
import Axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import Header from './Header'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Rating from 'react-rating'
import config from './config'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
  }
  
  componentDidMount() {
    Axios.get(config.host + '/restaurants')
      .then(response => {
        this.setState({
          restaurants: response.data
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
          <h1 style={{textAlign: "center"}}>Top Restaurants</h1>
          <hr/>
          <ListGroup style={{width: "70vw", paddingLeft: "5vw"}}>
          {
            this.state.restaurants.map((restaurant, index) => {
              return (
                <div className="restaurantList" key={index}>
                  <ListGroup.Item>
                    <Row>
                      <Col sm={7}>
                        <Link to={{pathname: `/restaurant/${restaurant.id}`}}><h3>{restaurant.name}</h3></Link>
                      </Col>
                      <Col sm={2}><h6>{restaurant.cuisine}</h6></Col>
                      <Col sm={3}><Rating emptySymbol={<img alt="empty" src="/star-empty.png" width="20px" height="20px"/>} fullSymbol={<img alt="full" src="/star-full.png" width="20px" height="20px"/>} initialRating={restaurant.rating} fractions="10" readonly/></Col>
                    </Row>
                  </ListGroup.Item>
                </div>
              )
            })
          }
          </ListGroup>
        </Container>
      </>
    )
  }
}

export default withRouter(Home)