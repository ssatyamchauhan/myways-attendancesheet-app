import React from 'react';
import ls from 'local-storage'
import { Redirect } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './home.css'
import axios from 'axios';

export default class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            redirect: '',
            status: '',
            isTeacher: true,
            loggedUser: 'Student',
            studentList: []
        }
    }

    componentDidMount() {
        if (!ls.get('token')) {
            this.setState({
                redirect: <Redirect push to="/login" />
            })
        }
        else {
            axios.get('http://localhost:5000/status', { headers: { "Authorization": `Bearer ${ls.get('token')}` } })
                .then(data => {
                    this.setState({
                        studentList: data.data.data
                    })
                    if (data.data.role === 'teacher') {
                        this.setState({
                            isTeacher: false,
                            loggedUser: 'Teacher'
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }


    logout = () => {
        ls.clear();
        window.reload()
    }


    attendance = (e, i, event) => {
        console.log(e, i, event)
        event.preventDefault()
        if (event.target.value) {
            axios.put('http://localhost:5000/update', { attendance: event.target.value, email: e.email }, { headers: { "Authorization": `Bearer ${ls.get('token')}` } })
                .then(data => {
                    this.setState({
                        studentList: data.data.data,
                    })
                    if (data.data.role === 'teacher') {
                        this.setState({
                            isTeacher: false,
                            loggedUser: 'Teacher'
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {

        let JSX = (
            this.state.studentList.map((e, i) => {
                return (
                    <div>
                        <div className="list" key={i}>
                            <div>
                                <h4>{e.name}</h4>
                            </div>
                            <div>
                                <FormControl variant="outlined">
                                    <Select
                                        disabled={this.state.isTeacher}
                                        labelId="demo-simple-select-outlined-label"
                                        id={i}
                                        value={e.attendance || 'Absent'}
                                        onChange={(event) => this.attendance(e, i, event)}
                                    >
                                        <MenuItem value="Present">Present</MenuItem>
                                        <MenuItem value="Absent">Absent</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <h2></h2>
                    </div>
                )
            })
        )
        return (
            <div>
                {this.state.redirect}
                <nav>
                    <div className="nav-wrapper">
                        <a href="/home" class="brand-logo"><i class="material-icons">cloud</i>Attendance Sheet</a>
                        <ul className="right hide-on-med-and-down">
                            <li>{this.state.loggedUser +" login"}</li>
                            <li onClick={this.logout}><a href="login"><i class="material-icons right">view_module</i>Logout</a></li>

                        </ul>
                    </div>
                </nav>
                <div className="all-div">
                    {JSX}
                </div>

            </div>

        )
    }
}