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

import LoadingSkeleton from '../components/LoadingSkeleton.tsx';
import ErrorMessage from '../components/ErrorMessage.tsx';
import PlayerHeader from '../components/PlayerHeader.tsx';
import MatchHistory from '../components/MatchHistory.tsx';

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

    const enrichedMatches = (matches ?? []).slice(0, 20).map((match) => {
        const isWin = (match.player_slot < 128) === match.radiant_win;
        const minutes = Math.floor(match.duration / 60);
        const seconds = String(match.duration % 60).padStart(2, '0');
        const formattedDuration = `${minutes}:${seconds}`;

        return {
            ...match,
            heroName: heroMap.get(match.hero_id) || `Hero #${match.hero_id}`,
            isWin,
            formattedDuration,
        };
    });

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
                    <MatchHistory matches={enrichedMatches} />
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