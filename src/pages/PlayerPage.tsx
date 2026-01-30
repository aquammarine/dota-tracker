'use client';

import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import {
    getPlayer,
    getWinLoss,
    getRecentMatches,
    getHeroStats,
    getHeroesList,
} from '../services/opendotaApi.ts';
import Card from '../components/Card.tsx';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';

import LoadingSkeleton from '../components/LoadingSkeleton.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import PlayerHeader from '../components/PlayerHeader.tsx';
import { AlarmClockPlus } from 'lucide-react';

export default function PlayerPage() {
    const { accountId } = useParams<{ accountId: string }>();

    const results = useQueries({
        queries: [
            {
                queryKey: ['player', accountId],
                queryFn: () => getPlayer(accountId!),
                enabled: !!accountId,
            },
            { queryKey: ['winloss', accountId], queryFn: () => getWinLoss(accountId!) },
            { queryKey: ['recentMatches', accountId], queryFn: () => getRecentMatches(accountId!) },
            { queryKey: ['heroStats', accountId], queryFn: () => getHeroStats(accountId!) },
            {
                queryKey: ['heroesList'],
                queryFn: getHeroesList,
                staleTime: Infinity,
            },
        ],
    });

    const [playerQuery, wlQuery, matchesQuery, heroStatsQuery, heroesListQuery] = results;

    const isLoading = results.some((q) => q.isLoading);
    const error = results.find((q) => q.error)?.error as Error | undefined;

    if (isLoading) return <LoadingSkeleton />;
    if (error)
        return <ErrorMessage errorType={"Error Loading Player"} description={"Try checking the Account ID or refresh the page."} message={`Failed to load data: ${error.message || 'Unknown error'}`} />;

    const player = playerQuery.data!;
    const wl = wlQuery.data!;
    const matches = matchesQuery.data ?? [];
    const heroStats = heroStatsQuery.data ?? [];
    const heroesList = heroesListQuery.data ?? [];

    const heroMap = new Map<number, string>(
        heroesList.map((h) => [h.id, h.localized_name])
    );

    const totalGames = wl.win + wl.lose;
    const winRate = totalGames > 0 ? (wl.win / totalGames) * 100 : 0;

    const rankTier = player.rank_tier;
    const rank = rankTier ? Math.floor(rankTier / 10) : 0;
    const stars = rankTier ? rankTier % 10 : 0;

    // Top 8 most played heroes
    const topHeroes = heroStats
        .sort((a, b) => b.games - a.games)
        .slice(0, 8)
        .map((h) => ({
            name: heroMap.get(h.hero_id) || `Hero #${h.hero_id}`,
            games: h.games,
            wins: h.win,
            winRate: h.games > 0 ? (h.win / h.games) * 100 : 0,
        }));

    return (
        <div className="min-h-screen bg-[#020202] text-neutral-200 selection:bg-indigo-500/30 font-sans antialiased">
            <div className="fixed inset-0 bg-neutral-950 pointer-events-none" />
            <div className="relative w-full max-w-400 mx-auto p-4 md:p-8 space-y-8">

                <PlayerHeader player={player} wl={wl} winRate={winRate} rankTier={rankTier} rank={rank} stars={stars} accountId={accountId} />

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    <Card className="xl:col-span-3 bg-neutral-900/20 border-neutral-800/40 overflow-hidden flex flex-col backdrop-blur-sm">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/1">
                            <div>
                                <h2 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">Recent Activity</h2>
                                <p className="text-xs text-neutral-500 mt-1 font-medium">Performance tracking for last 20 encounters</p>
                            </div>
                            <button className="text-[10px] font-black text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-lg uppercase tracking-widest">
                                Full History
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 border-b border-white/5">
                                        <th className="px-8 py-5 font-black">Hero</th>
                                        <th className="px-8 py-5 font-black text-center">Outcome</th>
                                        <th className="px-8 py-5 font-black">Performance (K/D/A)</th>
                                        <th className="px-8 py-5 font-black">Duration</th>
                                        <th className="px-8 py-5 font-black text-right">Match Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/2">
                                    {matches.slice(0, 15).map((match) => {
                                        const isWin = (match.player_slot < 128) === match.radiant_win;
                                        return (
                                            <tr key={match.match_id} className="hover:bg-white/3 transition-all group cursor-default">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-6 bg-neutral-800 rounded overflow-hidden border border-white/5">
                                                            {/* HERO IMAGE */}
                                                        </div>
                                                        <span className="font-black text-neutral-200 group-hover:text-white transition-colors uppercase text-sm tracking-tight">
                                                            {heroMap.get(match.hero_id)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex justify-center">
                                                        <span className={`text-[10px] font-black uppercase w-16 text-center py-1 rounded-sm ${isWin ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                            }`}>
                                                            {isWin ? 'Victory' : 'Defeat'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 font-mono text-sm tracking-tighter">
                                                    <span className="text-emerald-400 font-bold">{match.kills}</span>
                                                    <span className="text-neutral-600 mx-1">/</span>
                                                    <span className="text-red-400 font-bold">{match.deaths}</span>
                                                    <span className="text-neutral-600 mx-1">/</span>
                                                    <span className="text-sky-400 font-bold">{match.assists}</span>
                                                </td>
                                                <td className="px-8 py-5 text-xs text-neutral-400 font-mono">
                                                    {Math.floor(match.duration / 60)}:{match.duration % 60}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="text-xs text-neutral-600 font-mono group-hover:text-indigo-400 transition-colors">#{match.match_id}</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    <div className="xl:col-span-1 space-y-8 flex flex-col">
                        <Card className="bg-neutral-900/20 border-neutral-800/40 p-8 grow backdrop-blur-sm">
                            <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-8 border-b border-white/5 pb-4">Signature Heroes</h2>
                            <div className="space-y-8">
                                {topHeroes.map((hero) => (
                                    <div key={hero.name} className="group cursor-default">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-black text-neutral-300 group-hover:text-white transition-colors uppercase tracking-tight">{hero.name}</span>
                                            <span className="text-[10px] text-neutral-500 uppercase font-black tracking-widest">{hero.games} Matches</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-neutral-800/50 rounded-full overflow-hidden flex border border-white/5">
                                            <div
                                                className="h-full bg-linear-to-r from-indigo-600 to-emerald-400 transition-all duration-1000 group-hover:saturate-150"
                                                style={{ width: `${hero.winRate}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-[10px] font-black text-emerald-400">{hero.winRate.toFixed(1)}% WR</span>
                                            <span className="text-[10px] font-black text-neutral-600 uppercase tracking-tighter">{hero.wins} Wins</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="bg-linear-to-br from-indigo-900/20 to-neutral-900/40 border-neutral-800/40 p-10 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-emerald-500 opacity-50" />
                            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-indigo-400/80 mb-4">Tactical Insight</p>
                            <p className="text-white text-xl italic leading-relaxed relative z-10 group-hover:scale-105 transition-transform duration-500">
                                "Luck is what happens when preparation meets opportunity."
                            </p>
                            <div className="absolute -bottom-4 -right-4 text-6xl text-white/2 font-black italic">"</div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}