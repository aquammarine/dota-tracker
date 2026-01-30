import axios from 'axios';
import type { Player, WinLoss, RecentMatch, HeroStat, Rating } from '../types/opendota';

const API = axios.create({
    baseURL: 'https://api.opendota.com/api',
    timeout: 15000,
});

export async function getPlayer(accountId: string | number): Promise<Player> {
    const res = await API.get<Player>(`/players/${accountId}`);
    return res.data;
}

export async function getWinLoss(accountId: string | number): Promise<WinLoss> {
    const res = await API.get<WinLoss>(`/players/${accountId}/wl`);
    return res.data;
}

export async function getRecentMatches(accountId: string | number): Promise<RecentMatch[]> {
    const res = await API.get<RecentMatch[]>(`/players/${accountId}/recentMatches`);
    return res.data;
}

export async function getHeroStats(accountId: string | number): Promise<HeroStat[]> {
    const res = await API.get<HeroStat[]>(`/players/${accountId}/heroes`);
    return res.data;
}

export async function getPlayerData(accountId: string | number) {
    const [player, winLoss, recentMatches, heroStats] = await Promise.all([
        getPlayer(accountId),
        getWinLoss(accountId),
        getRecentMatches(accountId),
        getHeroStats(accountId),
    ]);
    return { player, winLoss, recentMatches, heroStats };
}