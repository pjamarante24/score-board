import api from '../utils/api'

export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
export const ADD_PLAYER = 'ADD_PLAYER';
export const EDIT_PLAYER = 'EDIT_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';

export const receivePlayers = players => ({
    type: RECEIVE_PLAYERS,
    players
})

const addPlayer = player => ({
    type: ADD_PLAYER,
    player
})

export const handleAddPlayer = (player) => {
    return (dispatch) => {
        if (player.name === "" ||
            player.lastName === "") {
            alert('Please fill all the fields')
            return
        }

        return api.addPlayer(player)
            .then((p) => dispatch(addPlayer(p)))
    }
}

const editPlayer = player => ({
    type: EDIT_PLAYER,
    player
})

export const handleEditPlayer = (player) => {
    return (dispatch) => {
        if (player.name === "" ||
            player.lastName === "") {
            alert('Please fill all the fields')
            return
        }

        return api.editPlayer(player)
            .then((player) => dispatch(editPlayer(player)))
    }
}

export function removePlayer(id) {
    return (dispatch) => {
        return api.removePlayer(id)
            .then(() => dispatch({
                type: REMOVE_PLAYER,
                id
            }))
    }
}