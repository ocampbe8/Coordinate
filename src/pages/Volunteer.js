import {Button} from 'react-bootstrap'
import React, { Component } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/'
  })

export class Volunteer extends Component {
    state = {
        nonprofits: []
    }

    constructor() {
        super();
        api.get('/NonProfits').then(res => {
            console.log(res.data)
            this.setState({nonprofits : res.data})
        })
    }

    render(){
        return(
            <div>
                <div class='row'><h1>Non-Profits in your Area:</h1></div>
                {this.state.nonprofits.map(nonprofit => <div class='row'><div class='col-'><h1 key = {nonprofit.id}>{nonprofit.name}</h1></div>
                <div class='col-'><Button variant='primary' href= {'/nonprofit'}>Go</Button></div><div class='col-xl'></div></div>)}
            </div>
        );
    }
}
