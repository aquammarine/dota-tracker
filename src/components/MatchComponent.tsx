import type { RecentMatch } from "../types/opendota"

interface EnrichedMatch extends RecentMatch {
    heroName: string;
    heroImgUrl: string;
    isWin: boolean;
    formattedDuration: string;
}

interface MatchComponentProps {
    match: EnrichedMatch;
}

export default function MatchComponent({ match }: MatchComponentProps) {
    const { heroName, heroImgUrl, isWin, formattedDuration, kills, deaths, assists, match_id } = match;

    return (
        <tr key={match_id} className="hover:bg-white/3 transition-all group cursor-default">
            <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-16 h-9 bg-neutral-800 rounded overflow-hidden border border-white/5 shrink-0">
                        <img src={heroImgUrl} alt={heroName} className="w-full h-full object-cover" onError={(e) => {
                            (e.currentTarget.src = 'https://cdn.dota2.com/apps/dota2/images/heroes/unknown_sb.png');
                        }}/>
                    </div>
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
                <span className="text-emerald-400 font-bold">{kills}</span>
                <span className="text-neutral-600 mx-1">/</span>
                <span className="text-red-400 font-bold">{deaths}</span>
                <span className="text-neutral-600 mx-1">/</span>
                <span className="text-sky-400 font-bold">{assists}</span>
            </td>
            <td className="px-8 py-5 text-xs text-neutral-400 font-mono">
                {formattedDuration}
            </td>
            <td className="px-8 py-5 text-right">
                <span className="text-xs text-neutral-600 font-mono group-hover:text-indigo-400 transition-colors">#{match_id}</span>
            </td>
        </tr>
    )
}