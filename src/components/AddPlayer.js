import React, { Component } from 'react';

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

    componentDidMount() {
        const id = this.props.match ? this.props.match.params.id : null
        if (id) {
            this.setState({
                editMode: true,
                player: this.props.players.find(player => player.id === +id),
                currentId: id
            })
        }
    }

    onChange = (e) => this.setState({ player: { ...this.state.player, [e.target.id]: e.target.value } })
    onSubmit = (e) => {
        e.preventDefault()
        const { player, editMode } = this.state

        if (editMode) this.props.onEditPlayer(player)
        else this.props.onAddPlayer(player)

        this.props.history.push('/players')
    }

    render() {
        const { editMode, player } = this.state
        const { name, lastName, position } = player
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

export default AddPlayer;