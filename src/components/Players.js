import React, { useState } from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { connect } from 'react-redux';
import { removePlayer } from '../actions/players';

function Players(props) {
    const [selectedId, setSelectedId] = useState(null)

    const handleEditPlayer = (id) => {
        props.history.push(`/edit-player/${id}`)
    }

    const handleSelectId = (id) => {
        setSelectedId(selectedId === id ? null : id)
    }

    const handleDeletePlayer = (id) => {
        props.dispatch(removePlayer(id))
    }

    return (
        <div className="players">
            <h3>Players</h3>
            <ul id="players" data-testid="players-list">
                {props.players.map(({ id, name, lastName, position }) => (
                    <li
                        key={id}
                        className={selectedId === id ? "active" : null}
                        onClick={() => handleSelectId(id)}
                    >
                        {name} {lastName}, {position}
                        {selectedId === id ? (
                            <div className="group-btn">
                                <button onClick={() => handleEditPlayer(id)} data-testid="edit-button">
                                    <FiEdit />
                                </button>
                                <button onClick={() => handleDeletePlayer(id)} data-testid="remove-button">
                                    <FiTrash2 />
                                </button>
                            </div>)
                            : null}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function mapStateToProps({ players }) {
    return {
        players
    }
}

export default connect(mapStateToProps)(Players);