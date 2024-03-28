
function organizeByCountry(data) {
    teamsCountry = {
        "Bayern Munich": "Germany",
        "FC Copenhagen": "Denmark",
        "Galatasaray": "Turkey",
        "Manchester United": "England",
        "Arsenal": "England",
        "PSV": "Netherlands",
        "Lens": "France",
        "Sevilla": "Spain",
        "Real Madrid": "Spain",
        "Napoli": "Italy",
        "Sporting Braga": "Portugal",
        "Union Berlin": "Germany",
        "Real Sociedad": "Spain",
        "Inter Milan": "Italy",
        "Benfica": "Portugal",
        "Salzburg": "Austria",
        "Atletico Madrid": "Spain",
        "Lazio": "Italy",
        "Feyenoord": "Netherlands",
        "Celtic": "Scotland",
        "Borussia Dortmund": "Germany",
        "PSG": "France",
        "AC Milan": "Italy",
        "Newcastle United": "England",
        "Manchester City": "England",
        "RB Leipzig": "Germany",
        "Young Boys": "Switzerland",
        "Red Star Belgrade": "Serbia",
        "Barcelona": "Spain",
        "Porto": "Portugal",
        "Shakhtar Donetsk": "Ukraine",
        "Antwerp": "Belgium"
    }
    const organizedData = {};
    data.forEach(team => {
        const teamName = team.name;
        const country = teamsCountry[teamName];

        if (!organizedData.hasOwnProperty(country)) {
            organizedData[country] = [];
        }
        organizedData[country].push(team);
    });
    return organizedData;
}
function organizeByGroup(data) {
    const organizedData = {};

    data.forEach(team => {
        const groupName = team.group_name;
        if (!organizedData[groupName]) {
            organizedData[groupName] = [];
        }
        organizedData[groupName].push(team);
    });

    return organizedData;
}
module.exports = { organizeByGroup, organizeByCountry }