import { RECEIVE_PLAYERS, ADD_PLAYER, EDIT_PLAYER, REMOVE_PLAYER } from "../actions/players";

export default (state = [], action) => {
    switch (action.type) {
        case RECEIVE_PLAYERS:
            return [
                ...state,
                ...action.players
            ]
        case ADD_PLAYER:
            return state.concat({
                id: state.length,
                name: action.player.name,
                lastName: action.player.lastName,
                position: action.player.position,
            })

        case EDIT_PLAYER:
            return state.map((player) => action.player.id === player.id ? action.player : player)

        case REMOVE_PLAYER:
            return state.filter((player) => action.id !== player.id)

        default:
            return state
    }
}