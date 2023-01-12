import { About } from './GoalCardHandler';
export interface Root {
    copyright: string;
    records: Record[];
  }
  
  export interface Record {
    standingsType: string;
    league: League;
    division: Division;
    conference: Conference;
    teamRecords: TeamRecord[];
  }
  
  export interface League {
    id: number;
    name: string;
    link: string;
  }
  
  export interface Division {
    id: number;
    name: string;
    nameShort: string;
    link: string;
    abbreviation: string;
  }
  
  export interface Conference {
    id: number;
    name: string;
    link: string;
  }
  
  export interface TeamRecord {
    team: Team;
    leagueRecord: LeagueRecord;
    regulationWins: number;
    goalsAgainst: number;
    goalsScored: number;
    points: number;
    divisionRank: string;
    divisionL10Rank: string;
    divisionRoadRank: string;
    divisionHomeRank: string;
    conferenceRank: string;
    conferenceL10Rank: string;
    conferenceRoadRank: string;
    conferenceHomeRank: string;
    leagueRank: string;
    leagueL10Rank: string;
    leagueRoadRank: string;
    leagueHomeRank: string;
    wildCardRank: string;
    row: number;
    gamesPlayed: number;
    streak: Streak;
    pointsPercentage: number;
    ppDivisionRank: string;
    ppConferenceRank: string;
    ppLeagueRank: string;
    lastUpdated: string;
  }
  
  export interface Team {
    id: number;
    name: string;
    link: string;
  }
  
  export interface LeagueRecord {
    wins: number;
    losses: number;
    ot: number;
    type: string;
  }
  
  export interface Streak {
    streakType: string;
    streakNumber: number;
    streakCode: string;
  }
  
  
  export interface StandingsRowProps {
      team: number;
      gamesPlayed: number;
      wins: number;
      losses: number;
      ot: number;
      points: number;
      divisionRank: string;
      divisionL10Rank: string;
      goalDifference: number;
  }
  
  export interface DivisionProps {
      division: string;
      standings: StandingsRowProps[];
  }
  
  export interface StandingsProps {
      divisions: DivisionProps[];
  }
  
  export async function getStandings(): Promise<StandingsProps> {
      const response = await fetch("https://statsapi.web.nhl.com/api/v1/standings");
      const datawait = response.json();
      let data = await datawait;
      const standings = data.records as Record[];
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
      }
      );
      return {
          divisions: divisions,
      };
  }
  
  export interface LeagueStandingsProps {
      league: string;
      standings: StandingsRowProps[];
  }
  
  export async function getLeagueStandings(): Promise<LeagueStandingsProps> {
      const response = await fetch("https://statsapi.web.nhl.com/api/v1/standings");
      const datawait = response.json();
      let data = await datawait;
      const standings = data.records as Record[];
      const league = standings[0].league.name;
      const standingsALl = standings.flatMap((division) => division.teamRecords)
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
      }
      );
      standingsRows.sort((a, b) => (a.points > b.points) ? -1 : 1 );
      return {
          league: league,
          standings: standingsRows,
      };
  }