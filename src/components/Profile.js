import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Map from './Map';
import Reviews from './Reviews';
import './styles/profile.css';
import { Form, Button, Carousel } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      profiles: {
        sitter_pet_types: [],
        images: [],
        reviews: [],
        lookup_id: 0
      },
    }
  }

  componentDidMount() {

    let lookupProfileID = this.props.match.params.id ? this.props.match.params.id : 0;
    this.getProfiles(lookupProfileID)

  }

  getProfiles = (pid) => {
    fetch('http://localhost:8080/api/users?id=' + pid)
    .then(results => {
      results.json().then((res) => {
        this.setState({
          profiles: res[0], // individual profile is first result
          lookup_id: pid
        });
      })
    })

  };

  handleSubmit = (e) => {

    let newReview = {
      from_id: localStorage.getItem('loggedInUsersId'),
      to_id: this.state.lookup_id,
      rating: 5, //HARDCODED
      content: e.target.elements[0].value
    };

    e.preventDefault();
    e.target.elements[0].value = ""
    fetch('http://localhost:8080/api/reviews', {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    })
    .then(res => res.json())
    .then((response) => {
      this.getProfiles(this.state.lookup_id) // refetch reviews
      console.log("Success:", JSON.stringify(response))
    })
    .catch(error => console.log('Error:', error))
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-header">

            <div className="profile-avatar">
                <img src={this.state.profiles.avatar} alt="avatar" />
            </div>

            <div className="profile-text">
              <div className="profile-name">
                  <h3>{this.state.profiles.first_name} {this.state.profiles.last_name}</h3>
                  <Link to={`/profile/${this.state.lookup_id}/contact?name=${this.state.profiles.first_name}`} className="btn btn-info">Contact</Link>
              </div>
              <div className="profile-info">
                  <div className="profile-pet-icon">
                    {this.state.profiles.sitter_pet_types.map((pet) =>
                    <div key={pet.pet_type_id}>
                    {pet.icon}
                    </div>
                    )}
                  </div>
                  <p>{this.state.profiles.city}, ON, {this.state.profiles.postal_code}</p>
                  <div className="profile-rating">
                  <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={parseInt(this.state.profiles.avg_rating)}
                  />
                  </div>
              </div>

            </div>
          </div>

          <div className="profile-bio">
            <strong>{this.state.profiles.first_name} says:</strong> <i>{this.state.profiles.bio}</i>
          </div>

          <Carousel className="profile-images">
            {this.state.profiles.images.map((image, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image.image}
                    alt="sliding-images-of-user-or-their-pet"
                  />
                </Carousel.Item>
              )
            })}
          </Carousel>
          
          {localStorage.getItem('loggedInUsersId') ? (
            <Form className="review-form" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Add a Review:</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Button variant="primary" type="submit" >Submit</Button>
            </Form>
          ) : (
            ""
          )}

          {this.state.profiles.reviews ? <Reviews reviews={this.state.profiles.reviews}/> : "No reviews yet. Be the first!"}

        </div>

        <div className="profile-map">
          <h4>{this.state.profiles.first_name}'s Neighbourhood</h4>
          <Map profiles={[this.state.profiles]} profilePageExists={true} zoom={13}/>
        </div>
      </div>
    )
  }
}

export default Profile;