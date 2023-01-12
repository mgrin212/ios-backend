"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getAllFromID = exports.testGoalProps = exports.getAllGoalProps = exports.getGoalProps = exports.PlayerType = void 0;
const function_1 = require("fp-ts/lib/function");
const O = __importStar(require("fp-ts/lib/Option"));
var PlayerType;
(function (PlayerType) {
    PlayerType["GoalScorer"] = "Scorer";
    PlayerType["Assist"] = "Assist";
    PlayerType["Goalie"] = "Goalie";
    PlayerType["PlayerID"] = "PlayerID";
    PlayerType["Winner"] = "Winner";
    PlayerType["Loser"] = "Loser";
    PlayerType["Shooter"] = "Shooter";
    PlayerType["PenaltyOn"] = "PenaltyOn";
    PlayerType["DrewBy"] = "DrewBy";
    PlayerType["Blocker"] = "Blocker";
    PlayerType["Hitter"] = "Hitter";
    PlayerType["Hittee"] = "Hittee";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));
function shotType(play) {
    var _a;
    return (_a = play.result.secondaryType) !== null && _a !== void 0 ? _a : "";
}
function scoringPlaysNumList(plays) {
    return plays.scoringPlays;
}
function scoringPlays(plays) {
    return (0, function_1.pipe)(plays, scoringPlaysNumList, (scoringPlays) => scoringPlays.map((playNum) => plays.allPlays[playNum]));
}
function goalTeam(play) {
    return play.team.triCode;
}
function goalScorer(play) {
    var _a, _b;
    return (_b = (_a = play.players.find((player) => player.playerType === PlayerType.GoalScorer)) === null || _a === void 0 ? void 0 : _a.player.fullName) !== null && _b !== void 0 ? _b : "";
}
function assists(play) {
    return play.players
        .filter((player) => player.playerType === PlayerType.Assist)
        .map((player) => player.player.fullName);
}
function period(play) {
    return play.about.ordinalNum;
}
function time(play) {
    return play.about.periodTime;
}
function emptyNet(play) {
    return O.fromNullable(play.result.secondaryType === "Empty Net");
}
function powerPlay(play) {
    return O.fromNullable(play.result.secondaryType === "Power Play");
}
function homeScore(play) {
    return play.about.goals.home;
}
function awayScore(play) {
    return play.about.goals.away;
}
function getGoalProps(play) {
    return {
        goalScorer: goalScorer(play),
        assists: assists(play),
        team: goalTeam(play),
        period: period(play),
        homeScore: homeScore(play),
        awayScore: awayScore(play),
        time: time(play),
        shotType: shotType(play),
    };
}
exports.getGoalProps = getGoalProps;
function getAllGoalProps(plays) {
    // return scoringPlays(plays).map((play) => O.map(getGoalProps)(play));
    return (0, function_1.pipe)(plays, scoringPlays, (plays) => plays.map((play) => getGoalProps(play)));
}
exports.getAllGoalProps = getAllGoalProps;
const testGoalProps = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://statsapi.web.nhl.com/api/v1/game/2019020001/feed/live");
    const data = yield response.json();
    const plays = data.liveData.plays;
    const goals = getAllGoalProps(plays);
    console.log(goals);
});
exports.testGoalProps = testGoalProps;
const getAllFromID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://statsapi.web.nhl.com/api/v1/game/" + id + "/feed/live");
    const data = yield response.json();
    const plays = data.liveData.plays;
    const dt = data.gameData.datetime.dateTime;
    const timeUntil = getGameTime(dt);
    const goals = getAllGoalProps(plays);
    return [goals, timeUntil];
});
exports.getAllFromID = getAllFromID;
function getStartingTime(timeString) {
    return new Date(timeString);
}
function getTimeUntil(date) {
    let hours = ((date.getHours() + 2) % 12).toString();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    let period = "AM";
    if (parseInt(hours) >= 12) {
        period = "PM";
        if (parseInt(hours) > 12) {
            hours = (parseInt(hours) - 12).toString();
        }
    }
    return `${hours}:${minutes} ${period}`;
}
const getGameTime = (time) => getTimeUntil(getStartingTime(time));
