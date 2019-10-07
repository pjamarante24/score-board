import { RECEIVE_SCOREBOARD, ADD_SCORE } from "../actions/scoreboard";
import { REMOVE_PLAYER } from "../actions/players";

export default (state = [], action) => {
    switch (action.type) {
        case RECEIVE_SCOREBOARD:
            return [
                ...state,
                ...action.scoreboard
            ]
        case ADD_SCORE:
            const scoreboard = [...state]
            const playerScore = scoreboard.find(({ id }) => id === action.id)
            if (playerScore) {
                return scoreboard.map((player) => {
                    if (player.id === action.id)
                        player.score += action.score

                    return player
                })
            } else {
                return scoreboard.concat({
                    id: action.id,
                    score: action.score
                })
            }

        case REMOVE_PLAYER:
            return state.filter((playerScore) => playerScore.id !== action.id)
            
        default:
            return state
    }
};