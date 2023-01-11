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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const GoalCardHandler_1 = require("./data/GoalCardHandler");
const node_fetch_1 = __importDefault(require("node-fetch"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const key = process.env.API_KEY;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var games = yield fetcher();
    res.send(JSON.stringify(games));
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
const fetcher = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, node_fetch_1.default)(
    // "https://statsapi.web.nhl.com/api/v1/schedule?date=2022-12-4&expand=schedule.linescore"
    "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore")
        .then((response) => response.json())
        .then((data) => data)
        .then((data) => makeGameObjects(data));
});
const makeGameObjects = (root) => {
    let data = root.dates[0].games.map((game) => __awaiter(void 0, void 0, void 0, function* () {
        let goalProps = yield (0, GoalCardHandler_1.getAllFromID)(game.gamePk);
        const gameObject = {
            homeTeam: game.teams.home.team.name,
            awayTeam: game.teams.away.team.name,
            homeScore: game.teams.home.score,
            awayScore: game.teams.away.score,
            currentPeriodOrdinal: game.linescore.currentPeriodOrdinal ? game.linescore.currentPeriodOrdinal : "Final",
            currentPeriodTimeRemaining: game.linescore.currentPeriodTimeRemaining ? game.linescore.currentPeriodTimeRemaining : "Final",
            goalCards: goalProps,
        };
        return gameObject;
    }));
    return Promise.all(data);
};
