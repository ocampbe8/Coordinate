import React from 'react'

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
                <img src="http://placeimg.com/150/150" rounded></img>
                <h1>Demo Nonprofit:</h1>
                {this.state.events.map(event => <div><h1 key = {event.id}>{event.name}</h1>
                <Button href= {'/event'}></Button></div>)}
            </div>
        );
    }
}