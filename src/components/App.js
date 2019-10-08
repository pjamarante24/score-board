import React, { Component } from 'react';
import ScoreBoard from './ScoreBoard';
import Players from './Players';
import AddPlayer from './AddPlayer';
import Search from "./Search";
import { getPlayers } from "../utils/_DATA";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

class App extends Component {
  state = {
    players: [],
    scoreboard: []
  }

  componentDidMount() {
    this.setState({
      players: getPlayers()
    })
  }

  handleAddPlayer = (player) => {
    if (player.name === "" ||
      player.lastName === "") {
      alert('Please fill all the fields')
      return
    }

    const { players } = this.state

    player = {
      ...player,
      id: players.length,
    }

    this.setState({
      players: this.state.players.concat(player)
    })
  }

  handleEditPlayer = (player) => {
    if (player.name === "" ||
      player.lastName === "") {
      alert('Please fill all the fields')
      return
    }

    const players = [...this.state.players]
    players[player.id] = player

    this.setState({
      players
    })
  }

  handleDeletePlayer = (id) => {
    this.setState({
      players: this.state.players.filter((player) => player.id !== id),
      scoreboard: this.state.scoreboard.filter((player) => player.id !== id)
    })
  }

  handleAddScore = (id, score) => {
    const scoreboard = [...this.state.scoreboard]
    if (scoreboard[id]) {
      scoreboard[id].score += score
    } else {
      scoreboard[id] = {
        id,
        score
      }
    }

    this.setState({
      scoreboard
    })
  }

  render() {
    const { players, scoreboard } = this.state

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
                <ScoreBoard scoreboard={scoreboard} players={players} />
                <Search players={players} onAddScore={this.handleAddScore} />
              </Route>
              <Route path="/players" component={
                (props) => <Players
                  {...props}
                  players={players}
                  onDeletePlayer={this.handleDeletePlayer}
                />
              } />
              <Route path="/add-player" component={
                (props) => <AddPlayer
                  {...props}
                  onAddPlayer={(this.handleAddPlayer)}
                />
              } />
              <Route path="/edit-player/:id" component={
                (props) => <AddPlayer
                  {...props}
                  players={players}
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

export default App;
