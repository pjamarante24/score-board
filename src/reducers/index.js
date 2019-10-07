import { combineReducers } from "redux";
import players from "./players";
import scoreboard from "./scoreboard";

export default combineReducers({
    players,
    scoreboard
})