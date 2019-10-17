import React, { Component } from 'react';
import ScoreBoard from './ScoreBoard';
import Players from './Players';
import AddPlayer from './AddPlayer';
import Search from "./Search";

import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {

    return (
      <div className="container" >
        <Router>
          <div>
            <nav className='nav'>
              <ul>
                <li>
                  <NavLink to="/" exact activeClassName="active" >Score Board</NavLink>
                </li>
                <li>
                  <NavLink to="/players" activeClassName="active">Players</NavLink>
                </li>
                <li>
                  <NavLink to="/add-player" activeClassName="active">Add Player</NavLink>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/" exact>
                <ScoreBoard />
                <Search/>
              </Route>
              <Route path="/players" component={
                (props) => <Players
                  {...props}
                />
              } />
              <Route path="/add-player" component={
                (props) => <AddPlayer
                  {...props}
                />
              } />
              <Route path="/edit-player/:id" component={
                (props) => <AddPlayer
                  {...props}
                  onEditPlayer={(this.handleEditPlayer)}
                />
              } />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
