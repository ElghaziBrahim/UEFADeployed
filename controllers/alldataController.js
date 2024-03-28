const axios = require("axios");
const functions = require("./functions")
const getAllByGroup = async (req, res) => {
    try {
        const key = process.env.Api_Key;
        const secret = process.env.Api_Secret;
        const url = `https://livescore-api.com/api-client/leagues/table.json?&key=${key}&secret=${secret}&competition_id=244`;
        const result = await axios.get(url);
        const resultByGroupe = functions.organizeByGroup(result.data.data.table)
        res.json(resultByGroupe);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getAllByCountry = async (req, res) => {
    try {
        const key = process.env.Api_Key;
        const secret = process.env.Api_Secret;
        const url = `https://livescore-api.com/api-client/leagues/table.json?&key=${key}&secret=${secret}&competition_id=244`;
        const result = await axios.get(url);
        const resultByCountry = functions.organizeByCountry(result.data.data.table)
        res.json(resultByCountry);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllByGroup,getAllByCountry }