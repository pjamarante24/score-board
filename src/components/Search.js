import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addScore } from '../actions/scoreboard';

function Search(props) {
    const getFullname = ({ name, lastName }) => `${name} ${lastName}`
    
    const [filterValue, setFilterValue] = useState('')
    const [selectedId, setSelectedId] = useState(null)

    const filterPlayers = (e) => {
        const value = e.target.value
        const player = props.players.find(player => getFullname(player).toLowerCase() === value.toLowerCase())
        setFilterValue(value)
        setSelectedId(player ? player.id : null)
    }

    const handleSelectId = (id) => {
        const player = props.players.find(player => player.id === id)
        setSelectedId(selectedId === id ? null : id)
        setFilterValue(player ? getFullname(player) : "")
    }

    return (
        <div className="search-players">
            <h3>Add Score</h3>
            <div className="add-score">
                <input type="text" placeholder="e.g Michael Jordan" onChange={filterPlayers} value={filterValue} />
                {
                    selectedId !== null ? (
                        <div className="group-btn">
                            <button onClick={() => props.dispatch(addScore(selectedId, 2))}>+2pts</button>
                            <button onClick={() => props.dispatch(addScore(selectedId, 3))}>+3pts</button>
                        </div>
                    )
                        : null
                }

            </div>

            <ul className="player-score">
                {filterValue !== "" ? props.players.map(({ id, name, lastName, position }) => {
                    const fullname = `${name} ${lastName}`
                    const regex = new RegExp(filterValue, 'gi')
                    const match = fullname.match(regex)

                    if (!match) return null

                    const result = fullname
                        .split(regex)
                        .reduce((previous, current, index) => {
                            return previous ?
                                [
                                    ...previous,
                                    current,
                                    (<b>{match[index]}</b>)
                                ]

                                : [
                                    current,
                                    (<b>{match[index]}</b>)
                                ]
                        }, null)

                    return (
                        <li
                            key={id}
                            onClick={() => handleSelectId(id)}
                            className={selectedId === id ? "active" : null}
                        >
                            {result}, {position}
                        </li>
                    )
                }) : null

                }
            </ul>
        </div>
    )
}

function mapStateToProps({ players }) {
    return {
        players
    }
}

export default connect(mapStateToProps)(Search);