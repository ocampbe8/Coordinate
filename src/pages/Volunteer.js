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
                <h1>Non-Profits in your Area:</h1>
                {this.state.nonprofits.map(nonprofit => <div><h1 key = {nonprofit.id}>{nonprofit.name}</h1>
                <Button href= {'/nonprofit'}></Button></div>)}
            </div>
        );
    }
}
