import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { GoalCard } from '../index';
import { option } from 'fp-ts';

export interface RootPlays {
  plays: Plays;
}
export interface Plays {
  allPlays: Play[];
  scoringPlays: number[];
  penaltyPlays: number[];
  playsByPeriod: PlayByPeriod[];
  currentPlay: Play;
}

export interface PlayByPeriod {
  startIndex: number;
  plays: number[];
  endIndex: number;
}

export interface Play {
  players: Player[];
  result: Result;
  about: About;
  coordinates: Coordinates;
  team: Team;
}

export interface Team {
  id: number;
  name: string;
  link: string;
  triCode: string;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface About {
  eventIdx: number;
  eventId: number;
  period: number;
  periodType: string;
  ordinalNum: string;
  periodTime: string;
  periodTimeRemaining: string;
  dateTime: string;
  goals: Goals;
}

export interface Goals {
  away: number;
  home: number;
}

export interface Result {
  event: string;
  eventCode: string;
  eventTypeId: string;
  description: string;
  secondaryType?: string;
}

export interface Player {
  player: PlayerInfo;
  playerType: PlayerType;
  seasonTotal?: number;
}

export interface PlayerInfo {
  id: number;
  fullName: string;
  link: string;
}

export enum PlayerType {
  GoalScorer = "Scorer",
  Assist = "Assist",
  Goalie = "Goalie",
  PlayerID = "PlayerID",
  Winner = "Winner",
  Loser = "Loser",
  Shooter = "Shooter",
  PenaltyOn = "PenaltyOn",
  DrewBy = "DrewBy",
  Blocker = "Blocker",
  Hitter = "Hitter",
  Hittee = "Hittee",
}

function shotType(play: Play) {
    return play.result.secondaryType ?? "";
  }
  
  function scoringPlaysNumList(plays: Plays) {
    return plays.scoringPlays;
  }
  function scoringPlays(plays: Plays) {
    return pipe(
      plays,
      scoringPlaysNumList,
      (scoringPlays) => scoringPlays.map((playNum) => plays.allPlays[playNum])
    );
  }
  
  function goalTeam(play: Play) {
    return play.team.triCode;
  }
  
  function goalScorer(play: Play): string {
    return play.players.find((player) => player.playerType === PlayerType.GoalScorer) ?.player.fullName ?? "";
  }
  
  function assists(play: Play) {
    return play.players
      .filter((player) => player.playerType === PlayerType.Assist)
      .map((player) => player.player.fullName);
  }
  
  function period(play: Play) {
    return play.about.ordinalNum;
  }
  
  function time(play: Play) {
    return play.about.periodTime;
  }
  
  function emptyNet(play: Play): O.Option<boolean> {
    return O.fromNullable(play.result.secondaryType === "Empty Net");
  }
  
  function powerPlay(play: Play): O.Option<boolean> {
    return O.fromNullable(play.result.secondaryType === "Power Play");
  }
  
  function homeScore(play: Play) {
    return play.about.goals.home;
  }
  
  function awayScore(play: Play){
    return play.about.goals.away;
  }
  
  export function getGoalProps(play: Play): GoalCard {
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
  
  export function getAllGoalProps(plays: Plays) {
    // return scoringPlays(plays).map((play) => O.map(getGoalProps)(play));
    return pipe(
      plays,
      scoringPlays,
      (plays) => plays.map((play) => getGoalProps(play))
    )
  }
  
  export const testGoalProps = async () => {
    const response = await fetch(
      "https://statsapi.web.nhl.com/api/v1/game/2019020001/feed/live"
    );
    const data = await response.json() as any;
    const plays = data.liveData.plays as Plays;
    const goals = getAllGoalProps(plays);
    console.log(goals);
  };

export const getAllFromID = async (id: number): Promise<GoalCard[]> => {
    const response = await fetch(
      "https://statsapi.web.nhl.com/api/v1/game/" + id + "/feed/live"
    );
    const data = await response.json() as any;
    const plays = data.liveData.plays as Plays;
    const goals = getAllGoalProps(plays);
    return goals
}
