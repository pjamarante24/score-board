import { receivePlayers } from "./players";
import { receiveScoreboard } from "./scoreboard";
import { getInitialData } from "../utils/api";

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ players, scoreboard }) => {
                dispatch(receivePlayers(players))
                dispatch(receiveScoreboard(scoreboard))
            })
    }
}