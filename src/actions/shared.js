import { _getPlayers, _getScoreboard } from "../utils/_DATA";
import { receivePlayers } from "./players";
import { receiveScoreboard } from "./scoreboard";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(receivePlayers(_getPlayers()))
        dispatch(receiveScoreboard(_getScoreboard()))
    }
}