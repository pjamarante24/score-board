import React, { Component } from 'react';

class Search extends Component {
    state = {
        filterValue: '',
        selectedId: null
    }

    filterPlayers = (e) => {
        const value = e.target.value
        const player = this.props.players.find(player => this.fullname(player).toLowerCase() === value.toLowerCase())
        this.setState({
            filterValue: value,
            selectedId: player ? player.id : null
        })
    }

    fullname = ({ name, lastName }) => `${name} ${lastName}`

    handleSelectId = (id) => {
        const { selectedId } = this.state
        const player = this.props.players.find(player => player.id === id)
        this.setState({
            selectedId: selectedId === id ? null : id,
            filterValue: player ? this.fullname(player) : ""
        })
    }

    render() {
        const { filterValue, selectedId } = this.state

        return (
            <div className="search-players">
                <h3>Add Score</h3>
                <div className="add-score">
                    <input type="text" placeholder="e.g Michael Jordan" onChange={this.filterPlayers} value={filterValue} />
                    {
                        selectedId !== null ? (
                            <div className="group-btn">
                                <button onClick={() => this.props.onAddScore(selectedId, 2)}>+2pts</button>
                                <button onClick={() => this.props.onAddScore(selectedId, 3)}>+3pts</button>
                            </div>
                        )
                            : null
                    }

                </div>

                <ul className="player-score">
                    {filterValue !== "" ? this.props.players.map(({ id, name, lastName, position }) => {
                        const fullname = this.fullname({ name, lastName })
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
                                onClick={() => this.handleSelectId(id)}
                                className={selectedId === id ? "active" : null}
                            >
                                {result}, {position}
                            </li>
                        )
                    }) : null

                    }
                </ul>
            </div>
        );
    }
}

export default Search;