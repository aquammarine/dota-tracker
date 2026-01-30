import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import {
    getPlayer,
    getWinLoss,
    getRecentMatches,
    getHeroStats,
} from '../services/opendotaApi.ts';
import Card from '../components/Card.tsx';

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">Fetching Player Data...</p>
        </div>
    );
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-center">
            <p className="text-red-400 font-medium">{message}</p>
        </div>
    );
}

export default function PlayerPage() {
    const { accountId } = useParams<{ accountId: string }>();

    const results = useQueries({
        queries: [
            { queryKey: ['player', accountId], queryFn: () => getPlayer(accountId!), enabled: !!accountId },
            { queryKey: ['winloss', accountId], queryFn: () => getWinLoss(accountId!) },
            { queryKey: ['recentMatches', accountId], queryFn: () => getRecentMatches(accountId!) },
            { queryKey: ['heroes', accountId], queryFn: () => getHeroStats(accountId!) },
        ],
    });

    const [playerQuery, wlQuery, matchesQuery, heroQuery] = results;
    const isLoading = results.some((query) => query.isLoading);
    const error = results.find((query) => query.error)?.error as Error | undefined;

    if (isLoading) return <Loading />;
    if (error) return <ErrorMessage message={`Error: ${error.message}`} />;

    const player = playerQuery.data;
    const wl = wlQuery.data;

    const rankTier = player?.rank_tier;
    const leaderBoardRank = player?.leaderboard_rank;

    const rank = rankTier ? Math.floor(rankTier / 10) : null;
    const stars = rankTier ? rankTier % 10 : null;

    const ASSET_URL = "https://www.opendota.com/assets/images/dota2/rank_icons/";

    const matches = matchesQuery.data ?? [];

    if (!wl) return null;

    const totalGames = wl.win + wl.lose;
    const winRate = totalGames > 0 ? ((wl.win / totalGames) * 100).toFixed(1) : '0';

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <Card className="p-8 bg-neutral-900 border-neutral-800 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 p-8 opacity-5 select-none pointer-events-none">
                    <h1 className="text-8xl font-black italic uppercase">DOTA</h1>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img
                            src={player?.profile.avatarfull}
                            alt="Avatar"
                            className="w-32 h-32 rounded-2xl shadow-2xl border-2 border-neutral-700"
                        />
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl font-black text-white tracking-tight leading-none mb-2">
                                {player?.profile.personaname || 'Unknown Player'}
                            </h2>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
                                <span className="flex items-center gap-1">
                                    ID: <span className="text-neutral-200 font-mono tracking-normal">{accountId}</span>
                                </span>
                            </div>

                            <div className="mt-6 flex justify-center md:justify-start gap-8">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1">Win Rate</p>
                                    <p className={`text-3xl font-mono ${Number(winRate) >= 50 ? 'text-green-500' : 'text-red-500'}`}>
                                        {winRate}%
                                    </p>
                                </div>
                                <div className="w-px bg-neutral-800" />
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1">Match Record</p>
                                    <p className="text-2xl text-white italic">
                                        <span className="text-green-500">{wl.win}W</span> — <span className="text-red-500">{wl.lose}L</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center pr-4">
                        {rankTier ? (
                            <div className="relative w-24 h-24 transition-transform duration-500 hover:scale-110 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <img
                                    src={`${ASSET_URL}rank_icon_${rank}.png`}
                                    className="absolute inset-0 w-full h-full object-contain z-10"
                                    alt="Rank Medal"
                                />
                                {rank !== 8 && stars !== 0 && (
                                    <img
                                        src={`${ASSET_URL}rank_star_${stars}.png`}
                                        className="absolute inset-0 w-full h-full object-contain z-20"
                                        alt="Rank Stars"
                                    />
                                )}
                                {leaderBoardRank && (
                                    <span className="absolute bottom-2 left-0 right-0 text-center text-sm font-black text-white z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                                        {leaderBoardRank}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-20 h-20 bg-neutral-800/40 rounded-full flex items-center justify-center border border-neutral-700/50 shadow-inner">
                                    <span className="text-[10px] text-neutral-500 font-black uppercase tracking-tighter italic">N/A</span>
                                </div>
                                <span className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Unranked</span>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            <Card className="border-neutral-800 bg-neutral-900 shadow-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950/50 flex justify-between items-center">
                    <h3 className="font-bold text-neutral-300 uppercase tracking-widest text-sm italic">Recent Match Performance</h3>
                    <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter bg-neutral-800 px-2 py-1 rounded">Latest 20 Games</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-neutral-950/50 text-neutral-500 text-[10px] uppercase font-black tracking-widest">
                                <th className="p-4 text-left">Match ID</th>
                                <th className="px-4 py-4 text-left">Hero</th>
                                <th className="px-4 py-4 text-left">K / D / A</th>
                                <th className="px-4 py-4 text-left">Duration</th>
                                <th className="px-4 py-4 text-right pr-6">Result</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50">
                            {matches.slice(0, 20).map((match) => {
                                const isWin = (match.player_slot < 128) === match.radiant_win;
                                return (
                                    <tr key={match.match_id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4 font-mono text-sm text-neutral-500 group-hover:text-blue-400">{match.match_id}</td>
                                        <td className="px-4 py-4 font-bold text-neutral-300">#{match.hero_id}</td>
                                        <td className="px-4 py-4 font-mono text-sm">
                                            <span className="text-neutral-100">{match.kills}</span>
                                            <span className="mx-1 text-neutral-700">/</span>
                                            <span className="text-red-500">{match.deaths}</span>
                                            <span className="mx-1 text-neutral-700">/</span>
                                            <span className="text-neutral-100">{match.assists}</span>
                                        </td>
                                        <td className="px-4 py-4 text-neutral-400 text-sm font-mono">
                                            {Math.floor(match.duration / 60)}:{(match.duration % 60).toString().padStart(2, '0')}
                                        </td>
                                        <td className="px-4 py-4 text-right pr-6">
                                            <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase italic ${isWin ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                }`}>
                                                {isWin ? 'Victory' : 'Defeat'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}