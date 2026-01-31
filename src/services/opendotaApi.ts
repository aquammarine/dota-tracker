import axios from 'axios';
import type {
  Player,
  WinLoss,
  RecentMatch,
  HeroStat,
  HeroListItem,
} from '../types/opendota';

// Single Axios instance (best practice)
const API = axios.create({
  baseURL: 'https://api.opendota.com/api',
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const getPlayer = async (accountId: string): Promise<Player> => {
  const { data } = await API.get<Player>(`/players/${accountId}`);
  return data;
};

export const getWinLoss = async (accountId: string): Promise<WinLoss> => {
  const { data } = await API.get<WinLoss>(`/players/${accountId}/wl`);
  return data;
};

export const getRecentMatches = async (accountId: string): Promise<RecentMatch[]> => {
  const { data } = await API.get<RecentMatch[]>(`/players/${accountId}/recentMatches`);
  return data;
};

export const getHeroStats = async (accountId: string): Promise<HeroStat[]> => {
  const { data } = await API.get<HeroStat[]>(`/players/${accountId}/heroes`);
  return data;
};

export const getHeroesList = async (): Promise<HeroListItem[]> => {
  const { data } = await API.get<HeroListItem[]>('/heroes');
  return data;
};

export async function getMatch(matchId: string | number): Promise<any> {
  const { data } = await API.get(`/matches/${matchId}`);
  return data;
}

export default API;