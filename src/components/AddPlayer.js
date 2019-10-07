import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddPlayer, handleEditPlayer } from '../actions/players';

class AddPlayer extends Component {
    state = {
        editMode: false,
        currentId: null,
        player: {
            name: '',
            lastName: '',
            position: 'PG'
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editMode) {
            if (nextProps.currentId !== prevState.player.id) {
                prevState = {
                    ...prevState,
                    player: nextProps.players.find(({ id }) => +nextProps.match.params.id === id)
                }
            }
        }

        return prevState;
    }

    onChange = (e) => this.setState({ player: { ...this.state.player, [e.target.id]: e.target.value } })
    onSubmit = (e) => {
        e.preventDefault()
        const { player } = this.state
        const { editMode } = this.props

        if (editMode) this.props.dispatch(handleEditPlayer(player))
        else this.props.dispatch(handleAddPlayer(player))

        this.props.history.push('/players')
    }

    render() {
        const { editMode } = this.props
        const { name, lastName, position } = this.state.player
        return (
            <div className="add-player">
                <h3>{editMode ? "Edit" : "Add"} Player</h3>
                <form id="add-player" onSubmit={this.onSubmit}>
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" id="name" placeholder="e.g Kevin" value={name} onChange={this.onChange} required />
                    <label htmlFor="lastName">Last Name :</label>
                    <input type="text" name="lastName" id="lastName" placeholder="e.g Durant" value={lastName} onChange={this.onChange} required />
                    <label htmlFor="position">Position :</label>
                    <select name="position" id="position" value={position} onChange={this.onChange} required >
                        <option value="PG">Point Guard</option>
                        <option value="SG">Shooting Guard</option>
                        <option value="SF">Small Forward</option>
                        <option value="PF">Power Forward</option>
                        <option value="C">Center</option>
                    </select>
                    <button type="submit">{editMode ? "Edit" : "Add"}</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ players }, ownProps) {
    const id = ownProps.match ? ownProps.match.params.id : null
    const editMode = id && players.length > 0

    return {
        editMode,
        players,
        currentId: +id,
        ...ownProps
    }
}

export default connect(mapStateToProps)(AddPlayer);