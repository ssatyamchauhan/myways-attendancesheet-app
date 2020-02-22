import React from 'react';
import './users.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Redirect } from 'react-router';
import { Link as Link } from 'react-router-dom'
import axios from 'axios'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';




export default class Signup extends React.Component {


    state = {
        redirect: "",
        errortext: "",
        listofrole: ["teacher", "student"]
    }

    onsignup = () => {
        var user = document.getElementById("userid").value;
        var email = document.getElementById("emailid").value;
        var pass = document.getElementById("passw").value;
        var role = document.getElementById("role").value;
        if (user !== "" && email !== '' && pass !== '' && email.includes("@") && this.state.listofrole.includes(role)) {
            console.log('inside if')
            axios.post('http://localhost:5000/signup', { name: user, email: email, password: pass, role: role })
                .then((data) => {
                    console.log(data);
                    if (data.data.result === false) {
                        this.setState({
                            errortext: "This user already exists..."
                        })
                    } else {
                        this.setState({
                            redirect: <Redirect to='/Login' />
                        })
                    }
                })
                .catch((err) => {
                    console.log("err");
                })
        } else {
            this.setState({
                errortext: "Please Fill Empty Inputs..."
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
                                    <p style={{ color: "red" }}>{this.state.errortext}</p>
                                    <MDBInput
                                        label="Your Name..."
                                        group
                                        type="text"
                                        id="userid"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        label="Your role...teacher or student"
                                        group
                                        type="text"
                                        id="role"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        label="Your email Address..."
                                        group
                                        type="email"
                                        id="emailid"
                                        validate
                                        error="wrong"
                                        success="right"
                                    />
                                    <MDBInput
                                        label="Your password"
                                        group
                                        type="password"
                                        id="passw"
                                        validate
                                        containerClass="mb-0"
                                    />

                                    <div className="text-center mb-3">
                                        <MDBBtn
                                            onClick={this.onsignup}
                                            type="button"
                                            gradient="blue"
                                            rounded
                                            className="btn-block z-depth-1a"
                                        >
                                            Sign Up
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                                <MDBModalFooter className="mx-5 pt-3 mb-1">
                                    <p className="font-small grey-text d-flex justify-content-end">
                                        Have an Account?
                                        <Link to="/login" className="blue-text ml-1">
                                            Log In
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