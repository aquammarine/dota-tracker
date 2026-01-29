export interface Profile {
  account_id: number;
  personaname: string | null;
  name: string | null;
  plus: boolean;
  cheese: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  last_login: string | null;
  loccountrycode: string | null;
}

export interface Player {
  profile: Profile;
  rank_tier?: number;
  leaderboard_rank?: number;
  competitive_rank?: number;
  mmr_estimate?: { estimate: number };
}

export interface Rating{
  account_id: number;
  match_id: number;
  solo_competitive_rank: number;
  competitive_rank: number;
  time: number;
}

export interface WinLoss {
  win: number;
  lose: number;
}

export interface HeroStat {
  hero_id: number;
  last_played: number;
  games: number;
  win: number;
  with_games: number;
  with_win: number;
  against_games: number;
  against_win: number;
}

export interface RecentMatch {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  start_time: number;
  version: number | null;
  kills: number;
  deaths: number;
  assists: number;
  skill: number | null;
  lane: number | null;
  lane_role: number | null;
  is_roaming: boolean | null;
  cluster: number;
  leaver_status: number;
  party_size: number | null;
}