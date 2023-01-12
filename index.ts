import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Root } from "./data/types";
import { getAllFromID } from "./data/GoalCardHandler";
import { DivisionProps, getLeagueStandings, getStandings } from "./data/Standings";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const key = process.env.API_KEY;

app.get("/", async (req: Request, res: Response) => {
  var games = await fetcher();
  var standings = await (await getStandings()).divisions
  var out = {games: games, standings: standings} as RootOut
  res.send(JSON.stringify(out))
});

app.get("/standings", async (req: Request, res: Response) => {
  var standings = await getStandings()
  res.send(JSON.stringify(standings.divisions))
  })

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const fetcher = async () => {
  return await fetch(
    // "https://statsapi.web.nhl.com/api/v1/schedule?date=2022-12-4&expand=schedule.linescore"
    "https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore"
  )
    .then((response) => response.json())
    .then((data) => data as Root)
    .then((data) => makeGameObjects(data))
};



const makeGameObjects = (root: Root) => {
  let data = root.dates[0].games.map(async (game) => {
    let goalProps = await getAllFromID(game.gamePk)
    const gameObject: GameObject = {
      homeTeam: game.teams.home.team.name,
      awayTeam: game.teams.away.team.name,
      homeScore: game.teams.home.score,
      awayScore: game.teams.away.score,
      currentPeriodOrdinal: game.linescore.currentPeriodOrdinal? game.linescore.currentPeriodOrdinal : "Final",
      currentPeriodTimeRemaining: game.linescore.currentPeriodTimeRemaining? game.linescore.currentPeriodTimeRemaining : "Final",
      goalCards: goalProps,
    };
    return gameObject;
  });
  return Promise.all(data)
}

interface GameObject {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  goalCards: GoalCard[]
}

export interface GoalCard {
  goalScorer: string;
  assists: string[];
  team: string;
  period: string;
  homeScore: number;
  awayScore: number;
  time: string;
  shotType: string;
}

export interface RootOut {
  games: GameObject[]
  standings: DivisionProps[]
}





