import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Header from "../../Components/header";
import "../container_style.css";
import { connect } from "react-redux";
import { profile } from "../../redux/action";
import jwt_decode from "jwt-decode";
import axios from "axios";
import moment from 'moment';
import MenuProfile from '../../Components/MenuProfile';



class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            email: '',
            date:'',
        }
    }

    componentDidMount() {
        const getToken = localStorage.getItem("jwToken");

        if (!getToken){
            this.props.history.push("/login")
        }
        else {
            const decodeToken = jwt_decode(getToken);
            this.setState({id: decodeToken.user.id});
            axios.get(
                "http://localhost:5000/api/profile",
                {
                    headers : {
                    'Content-Type': 'application/json',
                    'x-auth-token' : getToken
                    }})
                .then(response => {
                    // console.log(response);
                    this.setState({
                        name : response.data.name,
                        email: response.data.email,
                        date: response.data.date
                    })
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    }


    render() {
        return(
            <div>
                <Header/>
                <Card border="light">
                    <MenuProfile props={this.props}/>
                    <Card.Img variant="top" src="https://picsum.photos/300" />
                    <Card.Header>User's Profile

                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Username : {this.state.name}</Card.Title>
                        <Card.Text>Email : {this.state.email}</Card.Text>
                        <Card.Text>Created at : {moment(this.state.date).format("MMMM Do YYYY")}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}

export default connect(
    state => ({ user: state.user }),
    { profile }
)(Profile);