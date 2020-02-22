import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./users.css"
import axios from 'axios'
import { Link as Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import ls from 'local-storage';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

export default class Login extends React.Component {

  state = {
    redirect: "",
    errortext: ""
  }
  onlogin = () => {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    console.log(email,pass)
    if (email !== '' && pass !== '' && email.includes("@")) {
      axios.post("http://localhost:5000/login", { email: email, password: pass })
        .then((data) => {
          console.log(data)
          if (data.data.message === 'You are logged in') {
            console.log('inside')
            ls.clear()
            ls.set('token', data.data.credentials)
            this.setState({
              redirect: <Redirect to="/home" />
            })
          } else {
            if (data.data.message) {
              this.setState({
                errortext: data.data.message
              })
            } else {
              this.setState({
                errortext: data.data.message
              })
            }
          }
        })
    } else {
      this.setState({
        errortext: "Please Fill The Inputs..."
      })
    }
  }
  componentDidMount() {
    if(ls.get('token')){
    axios.get("http://localhost:5000/status",{ headers: {"Authorization" : `Bearer ${ls.get('token')}`} })
      .then((resp) => {
        if (resp.data.message) {
          this.setState({
            redirect: <Redirect to="/home" />
          })
        } else {
          this.setState({
            redirect: <Redirect to="/login" />
          })
        }
      })
    }
  }
  render() {
    return (
      <div className="login">
        {this.state.redirect}
        <MDBContainer>
          <MDBRow>
            <MDBCol md="8">
              <MDBCard>
                <MDBCardBody className="mx-5">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-3">
                      <strong>Sign in</strong>
                    </h3>
                  </div>
                  <p style={{color:"red"}}>{this.state.errortext}</p>
                  <MDBInput
                    label="Your email Address..."
                    group
                    type="email"
                    id="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    id="pass"
                    validate
                    containerClass="mb-0"
                  />

                  <p className="font-small blue-text d-flex justify-content-end pb-3">
                    Forgot
                      <Link to="/forgotpass" className="blue-text ml-1">
                      Password?
                      </Link>
                  </p>
                  <div className="text-center mb-3">
                    <MDBBtn
                      onClick={this.onlogin}
                      type="button"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                    >
                      Sign in
                      </MDBBtn>
                  </div>

                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Not a member?
                      <Link to="/signup" className="blue-text ml-1">

                      Sign Up
                        </Link>
                  </p>
                </MDBModalFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    )
  }
}