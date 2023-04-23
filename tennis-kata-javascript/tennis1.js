'use strict';

const numericalScores = {
    love: 0,
    fifteen: 1,
    thirty: 2,
    forty: 3,
    advantageOrWin: 4
}

const scoresLonghand = {
    love: 'Love',
    fifteen: 'Fifteen',
    thirty: 'Thirty',
    forty: 'Forty',
    loveAll: 'Love-All',
    fifteenAll: 'Fifteen-All',
    thirtyAll: 'Thirty-All',
    deuce: 'Deuce',
    advantagePlayerOne: 'Advantage player1',
    advantagePlayerTwo: 'Advantage player2',
    winPlayerOne: 'Win for player1',
    winPlayerTwo: 'Win for player2',
}

class TennisScoreCalculator {
    static calculateScore(playerOneNumericalScore, playerTwoNumericalScore) {
        if (playerOneNumericalScore === playerTwoNumericalScore) {
            return this.#calculateEqualMidgameScore(playerOneNumericalScore);
        }

        if (this.#playerOnCuspOfWinning(playerOneNumericalScore, playerTwoNumericalScore)) {
            return this.#calculateEndgameScore(playerOneNumericalScore, playerTwoNumericalScore)
        }

        return this.#calculateUnevenMidGameScore(playerOneNumericalScore, playerTwoNumericalScore)

    }

    static #calculateEqualMidgameScore(playerNumericalScore) {
        switch (playerNumericalScore) {
            case numericalScores.love:
                return scoresLonghand.loveAll;
            case numericalScores.fifteen:
                return scoresLonghand.fifteenAll;
            case numericalScores.thirty:
                return scoresLonghand.thirtyAll;
            default:
                return scoresLonghand.deuce;
        }
    }

    static #playerOnCuspOfWinning(playerOneNumericalScore, playerTwoNumericalScore) {
        return playerOneNumericalScore >= numericalScores.advantageOrWin || playerTwoNumericalScore >= numericalScores.advantageOrWin
    }

    static #calculateEndgameScore(playerOneNumericalScore, playerTwoNumericalScore) {
        let scoreDifference = playerOneNumericalScore - playerTwoNumericalScore;

        if (scoreDifference === 1)
            return scoresLonghand.advantagePlayerOne;

        if (scoreDifference === -1)
            return scoresLonghand.advantagePlayerTwo;

        if (scoreDifference >= 2)
            return scoresLonghand.winPlayerOne;

        return scoresLonghand.winPlayerTwo;
    }

    static #calculateUnevenMidGameScore(playerOneNumericalScore, playerTwoNumericalScore) {
        return `${this.#calculateIndividualScore(playerOneNumericalScore)}-${this.#calculateIndividualScore(playerTwoNumericalScore)}`
    }

    static #calculateIndividualScore(playerNumericalScore) {
        switch (playerNumericalScore) {
            case numericalScores.love:
                return scoresLonghand.love;
            case numericalScores.fifteen:
                return scoresLonghand.fifteen;
            case numericalScores.thirty:
                return scoresLonghand.thirty;
            case numericalScores.forty:
                return scoresLonghand.forty;
        }
    }
}


module.exports = TennisScoreCalculator;
