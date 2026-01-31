import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from './Card.tsx';
import type { Player, WinLoss } from '../types/opendota.ts'

const ASSET_URL = 'https://www.opendota.com/assets/images/dota2/rank_icons/';
const FALLBACK_AVATAR = 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg';

type PlayerHeaderProps = {
    player: Player;
    wl: WinLoss;
    winRate: number;
    rankTier: number | undefined;
    rank: number;
    stars: number;
    accountId: string | undefined;
};

export default function PlayerHeader({ player, wl, winRate, rankTier, rank, stars, accountId }: PlayerHeaderProps) {

    return (
        <Card className="relative overflow-hidden bg-neutral-900/20 border-neutral-800/40 backdrop-blur-xl w-full border-t-neutral-700/30">
            <div className="absolute -top-6 -right-10 text-[14rem] font-black italic uppercase tracking-tighter text-white/3 pointer-events-none select-none leading-none">
                DOTA 2
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12 items-center">

                <div className="lg:col-span-5 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group shrink-0">
                        <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500/20 to-emerald-500/20 rounded-[3rem] blur-2xl group-hover:opacity-100 transition duration-1000 opacity-50"></div>
                        <img
                            src={player?.profile?.avatarfull || FALLBACK_AVATAR}
                            alt="Avatar"
                            className="relative w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] border border-white/10 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none mt-2 drop-shadow-sm">
                            {player?.profile?.personaname || 'Private Profile'}
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                            <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
                                ID: {accountId}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 flex flex-col items-center justify-center py-4 border-x border-white/5">
                    <div className="relative w-48 h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[{ value: wl.win }, { value: wl.lose }]}
                                    dataKey="value"
                                    innerRadius={70}
                                    outerRadius={85}
                                    paddingAngle={8}
                                    stroke="none"
                                    startAngle={90}
                                    endAngle={450}
                                >
                                    <Cell fill="url(#winGradient)" />
                                    <Cell fill="#bf0000" />
                                </Pie>
                                <defs>
                                    <linearGradient id="winGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" />
                                        <stop offset="100%" stopColor="#059669" />
                                    </linearGradient>
                                </defs>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-black tracking-tighter ${winRate >= 50 ? 'text-emerald-400' : 'text-red-400'}`}>
                                {winRate.toFixed(1)}%
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">WINRATE</span>
                        </div>
                    </div>
                    <div className="flex gap-6 mt-4 items-center">
                        <div className="text-center">
                            <div className="text-emerald-500 font-black text-lg leading-none">{wl.win}</div>
                            <div className="text-[9px] uppercase font-bold text-neutral-600">Wins</div>
                        </div>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="text-center">
                            <div className="text-red-500 font-black text-lg leading-none">{wl.lose}</div>
                            <div className="text-[9px] uppercase font-bold text-neutral-600">Losses</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 h-full flex flex-col items-center justify-center bg-linear-to-b from-white/3 to-transparent p-8 rounded-[3rem] border border-white/5 relative group">
                    <p className="text-[10px] uppercase font-black text-indigo-400 tracking-[0.3em] mb-6">Matchmaking Rank</p>
                    {rankTier ? (
                        <div className="relative w-32 h-32 md:w-40 md:h-40 transition-transform duration-700 group-hover:rotate-3 group-hover:scale-110">
                            <img src={`${ASSET_URL}rank_icon_${rank}.png`} className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]" alt="Rank" />
                            {stars > 0 && rank !== 8 && (
                                <img src={`${ASSET_URL}rank_star_${stars}.png`} className="absolute inset-0 w-full h-full object-contain" alt="Stars" />
                            )}
                        </div>
                    ) : <div className="text-neutral-600 font-bold italic tracking-widest h-32 flex items-center">UNCALIBRATED</div>}
                </div>
            </div>
        </Card>
    )
}