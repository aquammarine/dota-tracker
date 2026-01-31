const ASSET_URL = 'https://www.opendota.com/assets/images/dota2/rank_icons/';

interface RankMedalProps {
    rankTier: number | null;
    size?: 'sm' | 'md' | 'lg';
}

export default function RankMedal({ rankTier, size = 'md' }: RankMedalProps) {
    if (!rankTier || rankTier === 0) {
        return <span className="text-neutral-500 italic">Uncalibrated</span>;
    }

    const rank = Math.floor(rankTier / 10);
    const stars = rankTier % 10;

    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
    };

    return (
        <div className={`relative ${sizeClasses[size]} hover:scale-110 transition-transform`}>
            <img src={`${ASSET_URL}rank_icon_${rank}.png`} className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]" alt="Rank" />
            {stars > 0 && rank !== 8 && (
                <img src={`${ASSET_URL}rank_star_${stars}.png`} className="absolute inset-0 w-full h-full object-contain" alt="Stars" />
            )}
        </div>
    );
}