import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/jobs/Dashboard';
import CreateJob from './components/jobs/CreateJob';

import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/jobs/create" component={CreateJob} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
