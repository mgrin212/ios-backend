import { Root } from "./types";

export interface LineScoreLive {
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  periods: Period[];
  shootoutInfo: ShootoutInfo;
  teams: Teams;
  powerPlayStrength: string;
  hasShootout: boolean;
  intermissionInfo: IntermissionInfo;
  powerPlayInfo: PowerPlayInfo;
}

export interface IntermissionInfo {
  intermissionTimeRemaining: number;
  intermissionTimeElapsed: number;
  inIntermission: boolean;
}

export interface PowerPlayInfo {
  situationTimeRemaining: number;
  situationTimeElapsed: number;
  inSituation: boolean;
}

export interface Period {
  periodType: string;
  startTime: string;
  endTime: string;
  num: number;
  ordinalNum: string;
  home: PeriodTeamInfo;
  away: PeriodTeamInfo;
  shootoutInto: ShootoutInfo;
}

export interface PeriodTeamInfo {
  goals: number;
  shotsOnGoal: number;
  rinkSide: string;
}

export interface ShootoutIntoTeam {
  scores: number;
  attempts: number;
}

export interface ShootoutInfo {
  home: ShootoutIntoTeam;
  away: ShootoutIntoTeam;
}

export interface Team {
  id: number;
  name: string;
  link: string;
  abbreviation: string;
  triCode: string;
}

export interface LinescoreTeamInfo {
  team: Team;
  goals: number;
  shotsOnGoal: number;
  goaliePulled: boolean;
  numSkaters: number;
  powerPlay: boolean;
}

export interface Teams {
  home: LinescoreTeamInfo;
  away: LinescoreTeamInfo;
}

