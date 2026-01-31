import type { RecentMatch } from "../types/opendota";
import MatchComponent from "./MatchComponent";
import Card from "./Card";

interface EnrichedMatch extends RecentMatch {
    heroName: string,
    heroImgUrl: string,
    isWin: boolean,
    formattedDuration: string,
}

interface MatchHistoryProps {
    matches: EnrichedMatch[]
}

export default function MatchHistory({ matches }: MatchHistoryProps) {
    return (
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
                            <th className="px-8 py-5 font-black">K/D/A</th>
                            <th className="px-8 py-5 font-black">Duration</th>
                            <th className="px-8 py-5 font-black text-right">Match Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/2">
                        {matches.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-12 text-center text-neutral-500 italic">
                                    No recent matches found
                                </td>
                            </tr>
                        ) : (
                            matches.map((match) => (
                                <MatchComponent
                                    key={match.match_id}
                                    match={match}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}