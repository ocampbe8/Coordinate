import React from 'react'

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
                <img src="https://placekitten.com/150/150" roundedCircle></img>
                <h1>Demo Nonprofit:</h1>
                {this.state.requests.map(event => <div><h1 key = {request.id}>{request.name}</h1>
                <Button onClick = {alert('Successfully signed up!')}>Sign Up</Button></div>)}
            </div>
        );
    }
}