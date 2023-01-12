"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeagueStandings = exports.getStandings = void 0;
function getStandings() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://statsapi.web.nhl.com/api/v1/standings");
        const datawait = response.json();
        let data = yield datawait;
        const standings = data.records;
        const divisions = standings.map((division) => {
            const divisionName = division.division.name;
            const standingsRows = division.teamRecords.map((team, index) => {
                return {
                    team: team.team.id,
                    gamesPlayed: team.gamesPlayed,
                    wins: team.leagueRecord.wins,
                    losses: team.leagueRecord.losses,
                    ot: team.leagueRecord.ot,
                    points: team.points,
                    divisionRank: team.divisionRank,
                    divisionL10Rank: team.divisionL10Rank,
                    goalDifference: team.goalsScored - team.goalsAgainst,
                };
            });
            return {
                division: divisionName,
                standings: standingsRows,
            };
        });
        return {
            divisions: divisions,
        };
    });
}
exports.getStandings = getStandings;
function getLeagueStandings() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://statsapi.web.nhl.com/api/v1/standings");
        const datawait = response.json();
        let data = yield datawait;
        const standings = data.records;
        const league = standings[0].league.name;
        const standingsALl = standings.flatMap((division) => division.teamRecords);
        const standingsRows = standingsALl.map((team) => {
            return {
                team: team.team.id,
                gamesPlayed: team.gamesPlayed,
                wins: team.leagueRecord.wins,
                losses: team.leagueRecord.losses,
                ot: team.leagueRecord.ot,
                points: team.points,
                divisionRank: team.leagueRank,
                divisionL10Rank: team.divisionL10Rank,
                goalDifference: team.goalsScored - team.goalsAgainst,
            };
        });
        standingsRows.sort((a, b) => (a.points > b.points) ? -1 : 1);
        return {
            league: league,
            standings: standingsRows,
        };
    });
}
exports.getLeagueStandings = getLeagueStandings;
