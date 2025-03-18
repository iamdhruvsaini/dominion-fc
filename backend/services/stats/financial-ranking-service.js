import {
    getMostValuablePlayersFromDB,
    getHighestPaidPlayersFromDB,
    getBestValueForMoneyPlayersFromDB,
} from "../../repositories/stats/financial-ranking-repository.js";

export const getMostValuablePlayers = async () => {
    try {
        const mostValuablePlayers = await getMostValuablePlayersFromDB();
        return mostValuablePlayers
    } catch (error) {
        console.log("Something went wrong in financial ranking Services")
        throw error
    }
};

export const getHighestPaidPlayers = async () => {
    try {
        const highestPaidPlayers = await getHighestPaidPlayersFromDB();
        return highestPaidPlayers
    } catch (error) {
        console.log("Something went wrong in financial ranking Services")
        throw error
    }

};

export const getBestValueForMoneyPlayers = async () => {
    try {
        const bestValueForMoneyPlayers = await getBestValueForMoneyPlayersFromDB();
        return bestValueForMoneyPlayers
    } catch (error) {
        console.log("Something went wrong in financial ranking Services")
        throw error
    }
};