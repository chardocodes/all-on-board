import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import { Link, withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { Container, Row, Col, Form } from 'react-bootstrap';

class ProfileFormEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      formType: "profile",
      userId: this.props.user.id,
      completed: true,
      validated: false,
      profileFormData: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChangeDate = date => {
    this.setState({
      dateOfBirth: date
    });
  }

  componentDidMount() {
    // console.log(this.state);
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        username: res.data.username,
        email: res.data.email
      })
    })
    
    API.getAllFilesOneUser(this.props.user.id).then(res => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].formType === "profile") {
          this.setState({
            profileFormData: res.data[i]
          })
          console.log(this.state.profileFormData);

        }
        
      }
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
    API.updateProfile(this.state).then(res => {
      console.log("Sumbit!")
      console.log(this.props.history)
      this.props.history.replace(`/profile`);
    })
  };

  handleChange = event => {
    const { name, value } = event.target;
    // const name = event.target.name;
    // const value = event.target.value
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  // eslint-disable-next-line no-dupe-class-members
  render() {
    const { validated } = this.state;
    return (
      <div>
        <Container>
          <br></br>
          <Row>
            <p>Put Text Here!</p>
          </Row>
          <Row>
            <Col>
              <div className="container">
                <h1>Profile Form</h1>
                <Form noValidate
                  validated={validated}
                  onSubmit={this.handleFormSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>First name</Form.Label>
                      <Form.Control className="form-control"
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        id="firstName"
                        onChange={this.handleChange} />
                      <Form.Control.Feedback>
                        Looks good!
                          </Form.Control.Feedback>
                    </Form.Group>

                    <div className="form-group">
                      <label htmlFor="middleInitial">Middle Initial</label>
                      <input className="form-control"
                      placeholder={this.state.profileFormData.middleInitial}
                        // placeholder="Middle Initial goes here..."
                        name="middleInitial"
                        type="text"
                        id="middleInitial"
                        onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input className="form-control"
                        placeholder="Last name goes here..."
                        name="lastName"
                        type="text"
                        id="lastName"
                        onChange={this.handleChange} />
                    </div>
                  </Form.Row>
                  <div className="form-group">
                    <label htmlFor="DOB">Date of Birth:</label>
                    <br></br>
                    <DatePicker className="form-control"
                      placeholder="DOB goes here..."
                      name="dateOfBirth"
                      type="text"
                      id="dateOfBirth"
                      onChange={this.handleChangeDate}
                      selected={this.state.startDate}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input className="form-control"
                      placeholder="Email goes here..."
                      name="email"
                      type="text"
                      id="email"
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input className="form-control"
                      placeholder="Phone Number goes here..."
                      name="phone"
                      type="text"
                      id="phone"
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input className="form-control"
                      placeholder="Address goes here..."
                      name="address"
                      type="text"
                      id="address"
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender:
              <br></br>
                      <select className="form-control"
                        name="gender"
                        type="gender"
                        id="gender"
                        onChange={this.handleChange}>
                        <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="preferredName">Preferred Name:</label>
                    <input className="form-control"
                      placeholder="Preferred Name goes here..."
                      name="preferredName"
                      type="preferredName"
                      id="preferredName"
                      onChange={this.handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(withAuth(ProfileFormEdit));
