import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
import SignatureCanvas from 'react-signature-canvas'
import "./policymanual.css";
import { Container, Row, Col, Card } from 'react-bootstrap';

import pdf from "./../../pdf/PolicyManual.pdf";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PolicyManual extends Component {

  state = {
    username: "",
    email: "",
    sigPad: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      formType: "policy",
      completed: true,
      userId: this.props.user.id,
      file: pdf,
      numPages: 27,
      pageNumber: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChangeDate = date => {
    this.setState({
      startDate: date
    });
  }

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      console.log(this.props.user.id);
      this.setState({
        username: res.data.username,
        email: res.data.email,
      })
    });
    API.getAllFilesOneUser(this.props.user.id).then(res => {
      console.log(this.props.user.id);
      this.setState({
        firstName: res.data[0].firstName,
        lastName: res.data[0].lastName,
      })
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    API.setProfile(this.state).then(res => {
      console.log(this.props.history)
      this.props.history.replace(`/profile`);
    })
  };

  clearForm = e => {
    e.preventDefault()
    this.sigPad.clear()
  }

  handleChange = event => {
    const { name, value } = event.target;
    // const name = event.target.name;
    // const value = event.target.value
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  // eslint-disable-next-line no-dupe-class-members
  render() {
    const { pageNumber, numPages, file } = this.state;
    return (
      <div>
        <Container>
          <br></br>
          <Row>
            <Card>
              <Card.Body>
                <h2>Please review the Policy Manual</h2>
                <p className="pbody">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Col md={6}>
             
                  <div className="mt-5" style={{ overflow: "auto" }}>
                    <Document
                      file={file}
                      onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                  </div>
             
            </Col>
            <Col md={6}>
              <div className="container" className="mt-5">
                <h1>POLICY MANUAL</h1>
                <h5>Information needed to complete your Policy Manual Form</h5>
                <p><span className="pcompleted">First Name:</span> {this.state.firstName}</p>
                <p><span className="pcompleted">Last Name:</span> {this.state.lastName}</p>

                <form onSubmit={this.handleFormSubmit}>
                  <label>
                    <input
                      name="isGoing"
                      type="checkbox"
                      required
                      checked={this.state.isGoing}
                      onChange={this.handleInputChange} /> &nbsp;
           I agree to the terms and conditions.
          </label>
                  <div>
                    <label htmlFor="date">Employee’s signature:</label>
                    <br></br>
                    <SignatureCanvas penColor='blue'
                      canvasProps={{ width: 500, height: 200, className: 'sigCanvas', style: { border: 'solid 1px black' } }}
                      ref={(ref) => { this.sigPad = ref }}
                    />
                  </div>
                  <div>
                    <button className="clearButton" onClick={this.clearForm}>Clear</button>
                  </div>
                  <br></br>
                  <div className="form-group">
                    <label htmlFor="date">Today's Date:</label>
                    <br></br>
                    <DatePicker className="form-control"
                      placeholder="Today's Date goes here..."
                      name="date"
                      type="text"
                      id="date"
                      onChange={this.handleChange}
                      onChange={this.handleChangeDate}
                      selected={this.state.startDate}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit <i class="fa fa-arrow-right" /></button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(withAuth(PolicyManual));



