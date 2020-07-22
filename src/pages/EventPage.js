import {Button} from 'react-bootstrap'
import React, { Component } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/'
  })

export class EventPage extends Component {
    state = {
        requests: []
    }

    constructor() {
        super();
        api.get('/Request').then(res => {
            console.log(res.data)
            this.setState({requests : res.data})
        })
    }

    render(){
        return(
            <div>
                <div class='row'><img src="https://placekitten.com/150/150" roundedCircle></img>
                <div class = 'col'><h1>Cat Adoption Drive:</h1><p>We have lots of lovely kitties that are looking for their forever homes! Come to this small party
                     where you will get a chance to fall in love with all of our felines! We need assistance in making sure the cats aren't overwhelmed and small party
                      favors to entertain potential adoptees during this event. Our building is located at 3400 Northwood Lane,
                    Indianapolis, IN, 46268!</p></div></div>
                <div class='row'><h1>We Need:</h1></div>
                {this.state.requests.map(request => <div class='row'><div class='col-'><h1 key = {request.id}>{request.title}</h1></div>
                <div class='col-'><Button onClick = {alert('Successfully signed up!')} variant='primary'>Sign Up</Button></div><div class='col-xl'></div></div>)}
            </div>
        );
    }
}