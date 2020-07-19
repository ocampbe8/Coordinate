import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Home} from './pages/Home';
import {EventPage} from './pages/EventPage';
import {Nonprofit} from './pages/Nonprofit';
import {Volunteer} from './pages/Volunteer';
import {NotFound} from './pages/NotFound';
import {Layout} from './components/Layout';
import { render } from '@testing-library/react';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Router>
            <Switch>
              <Route exact path = "/" component = {Home}/>
              <Route path = "/nonprofit" component = {Nonprofit}/>
              <Route path = "/volunteer" component = {Volunteer}/>
              <Route path = "/event" component = {EventPage}/>
              <Route component = {NotFound}/>
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
