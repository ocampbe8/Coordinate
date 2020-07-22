import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/'
  })

export class Nonprofit extends Component {
    state = {
        events: []
    }

    constructor() {
        super();
        api.get('/Events').then(res => {
            console.log(res.data)
            this.setState({events : res.data})
        })
    }

    render(){
        return(
            <div>
                <div class='row'><img src="http://placeimg.com/150/150/animals" rounded></img>
                <div class = 'col'><h1>Indianapolis ASPCA:</h1><p>Our mission is to care for Indianapolis' displaced animals while find loving homes for each of them! 
                    Please see below for oppurtunities to help out with our events, we could always use more volunteers! Our building is located at 3400 Northwood Lane,
                    Indianapolis, IN, 46268!</p></div></div>
                <div class='row'><h1>Upcoming Events:</h1></div>
                {this.state.events.map(event => <div class='row'><div class='col-'><h1 key = {event.id}>{event.title}</h1></div>
                <div class='col-'><Button variant='primary' href= {'/event'}>Go</Button></div><div class='col-xl'></div></div>)}
            </div>
        );
    }
}