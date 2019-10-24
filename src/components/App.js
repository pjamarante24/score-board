import React, { useEffect } from 'react';
import ScoreBoard from './ScoreBoard';
import Players from './Players';
import AddPlayer from './AddPlayer';
import Search from "./Search";

import { Switch, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData())
  })

  return (
    <div className="container" >
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
              <Search />
            </Route>
            <Route path="/players" component={Players} />
            <Route path="/add-player" component={AddPlayer} />
            <Route path="/edit-player/:id" component={AddPlayer} />
          </Switch>
        </div>
    </div>
  );
}

export default connect()(App);
