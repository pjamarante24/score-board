import React, { Component } from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi";

class Players extends Component {
    state = {
        selectedId: null
    }

    handleEditPlayer = (id) => {
        this.props.history.push(`/edit-player/${id}`)
    }

    handleSelectId = (id) => {

        this.setState({
            selectedId: this.state.selectedId === id ? null : id,
        })
    }

    render() {
        const { selectedId } = this.state
        return (
            <div className="players">
                <h3>Players</h3>
                <ul id="players">
                    {this.props.players.map(({ id, name, lastName, position }) => (
                        <li
                            key={id}
                            className={selectedId === id ? "active" : null}
                            onClick={() => this.handleSelectId(id)}
                        >
                            {name} {lastName}, {position}
                            {selectedId === id ? (
                                <div className="group-btn">
                                    <button onClick={() => this.handleEditPlayer(id)}>
                                        <FiEdit />
                                    </button>
                                    <button onClick={() => this.props.onDeletePlayer(id)}>
                                        <FiTrash2 />
                                    </button>
                                </div>)
                                : null}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Players;