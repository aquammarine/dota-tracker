import type { RecentMatch } from "../types/opendota"
import { useQuery } from "@tanstack/react-query";
import { getMatch } from "../services/opendotaApi";
import RankMedal from "./RankMedal";

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

    const {
        data: matchDetails,
        isLoading: loadingDetails,
        error: detailsError,
        refetch,
    } = useQuery({
        queryKey: ['matchDetails', match_id],
        queryFn: () => getMatch(match_id),
        enabled: false,
        staleTime: 10 * 60 * 1000,
    });

    const averageRankTier = matchDetails?.players
        ? Math.round(
            matchDetails.players
                .filter((p: any) => p.rank_tier > 0)
                .reduce((sum: number, p: any) => sum + p.rank_tier, 0) /
            matchDetails.players.filter((p: any) => p.rank_tier > 0).length
        )
        : null;

        console.log(match_id);
    return (
        <tr key={match_id} className="hover:bg-white/3 transition-all group cursor-default border-y border-y-neutral-600 ">
            <td className="px-8 py-5 w-10">
                <div className="flex items-center">
                    <div className="w-16 h-9 bg-neutral-800 rounded overflow-hidden border border-white/5 shrink-0">
                        <img src={heroImgUrl} alt={heroName} className="w-full h-full object-cover" onError={(e) => {
                            (e.currentTarget.src = 'https://cdn.dota2.com/apps/dota2/images/heroes/unknown_sb.png');
                        }} />
                    </div>
                </div>
            </td>
            <td className="px-8 py-5 w-10">
                <div className="flex justify-center">
                    <span className={`text-[10px] font-black uppercase w-6 text-center py-1 rounded-sm text-neutral-900 ${isWin ? 'bg-green-500' : 'bg-red-500 border'
                        }`}>
                        {isWin ? 'W' : 'L'}
                    </span>
                </div>
            </td>
            <td className="px-8 py-5 font-mono text-sm tracking-tighter">
                <span className="text-green-400 font-bold">{kills}</span>
                <span className="text-neutral-600 mx-1">/</span>
                <span className="text-red-500 font-bold">{deaths}</span>
                <span className="text-neutral-600 mx-1">/</span>
                <span className="text-blue-400 font-bold">{assists}</span>
            </td>
            <td className="px-8 py-5">
                <div className="flex items-center justify-center">
                    <RankMedal rankTier={averageRankTier} size="sm" />
                </div>
            </td>
            <td className="px-8 py-5 text-sm text-neutral-400 font-mono">
                {formattedDuration}
            </td>
        </tr>
    )
}