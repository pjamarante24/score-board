export const RECEIVE_SCOREBOARD = 'RECEIVE_SCOREBOARD';
export const ADD_SCORE = 'ADD_SCORE';

export const receiveScoreboard = scoreboard => ({
    type: RECEIVE_SCOREBOARD,
    scoreboard
});

export const addScore = (id, score) => ({
    type: ADD_SCORE,
    id,
    score
});