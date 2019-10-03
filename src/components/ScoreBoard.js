import React, { Component } from 'react';

class ScoreBoard extends Component {
    state = {}
    render() {
        const scoreboard = [...this.props.scoreboard]
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)

        return (
            <div className="score-board">
                <h3>Score Board</h3>
                <table id="score-board">
                    <thead>
                        <tr>
                            <th>Ranking</th>
                            <th>Points</th>
                            <th>Player</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>

                        {scoreboard.length > 0
                            ? scoreboard
                                .map((playerScore, index) => {
                                    if (!playerScore) return null
                                    const { id, score } = playerScore
                                    const player = this.props.players[id]
                                    if (!player) return null
                                    const { name, lastName, position } = player
                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{score}</td>
                                            <td>{lastName}, {name[0]}</td>
                                            <td>{position}</td>
                                        </tr>
                                    )
                                }) : (
                                <tr>
                                    <td align="center" colSpan="4">Nobody has scored</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ScoreBoard;