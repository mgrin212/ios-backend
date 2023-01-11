export interface Root {
  copyright: string
  totalItems: number
  totalEvents: number
  totalGames: number
  totalMatches: number
  metaData: MetaData
  wait: number
  dates: Date[]
}

export interface MetaData {
  timeStamp: string
}

export interface Date {
  date: string
  totalItems: number
  totalEvents: number
  totalGames: number
  totalMatches: number
  games: Game[]
  events: any[]
  matches: any[]
}

export interface Game {
  gamePk: number
  link: string
  gameType: string
  season: string
  gameDate: string
  status: Status
  teams: Teams
  linescore: Linescore
  venue: Venue
  content: Content
}

export interface Status {
  abstractGameState: string
  codedGameState: string
  detailedState: string
  statusCode: string
  startTimeTBD: boolean
}

export interface Teams {
  away: Away
  home: Home
}

export interface Away {
  leagueRecord: LeagueRecord
  score: number
  team: Team
}

export interface LeagueRecord {
  wins: number
  losses: number
  ot: number
  type: string
}

export interface Team {
  id: number
  name: string
  link: string
}

export interface Home {
  leagueRecord: LeagueRecord2
  score: number
  team: Team2
}

export interface LeagueRecord2 {
  wins: number
  losses: number
  ot: number
  type: string
}

export interface Team2 {
  id: number
  name: string
  link: string
}

export interface Linescore {
  currentPeriod: number
  currentPeriodOrdinal: string
  currentPeriodTimeRemaining: string
  periods: Period[]
  shootoutInfo: ShootoutInfo
  teams: Teams2
  powerPlayStrength: string
  hasShootout: boolean
  intermissionInfo: IntermissionInfo
  powerPlayInfo: PowerPlayInfo
}

export interface Period {
  periodType: string
  startTime: string
  endTime: string
  num: number
  ordinalNum: string
  home: Home2
  away: Away2
}

export interface Home2 {
  goals: number
  shotsOnGoal: number
  rinkSide: string
}

export interface Away2 {
  goals: number
  shotsOnGoal: number
  rinkSide: string
}

export interface ShootoutInfo {
  away: Away3
  home: Home3
  startTime?: string
}

export interface Away3 {
  scores: number
  attempts: number
}

export interface Home3 {
  scores: number
  attempts: number
}

export interface Teams2 {
  home: Home4
  away: Away4
}

export interface Home4 {
  team: Team3
  goals: number
  shotsOnGoal: number
  goaliePulled: boolean
  numSkaters: number
  powerPlay: boolean
}

export interface Team3 {
  id: number
  name: string
  link: string
}

export interface Away4 {
  team: Team4
  goals: number
  shotsOnGoal: number
  goaliePulled: boolean
  numSkaters: number
  powerPlay: boolean
}

export interface Team4 {
  id: number
  name: string
  link: string
}

export interface IntermissionInfo {
  intermissionTimeRemaining: number
  intermissionTimeElapsed: number
  inIntermission: boolean
}

export interface PowerPlayInfo {
  situationTimeRemaining: number
  situationTimeElapsed: number
  inSituation: boolean
}

export interface Venue {
  id?: number
  name: string
  link: string
}

export interface Content {
  link: string
}
