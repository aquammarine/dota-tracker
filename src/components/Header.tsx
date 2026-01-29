import SearchBar from './SearchBar';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-neutral-900/90 backdrop-blur-md border-b border-white/5 shadow-2xl">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo Section */}
                <div className="flex items-center gap-3 group cursor-default">
                    <div className="w-8 h-8 bg-red-600 rounded-sm rotate-45 border-2 border-white/20 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                    <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
                        Dota<span className="text-red-600">Tracker</span>
                    </h1>
                </div>

                {/* Search Bar - Taking middle ground */}
                <div className="flex-1 px-8">
                    <SearchBar size="max-w-md mx-auto" />
                </div>

                {/* Profile Indicator */}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Navigation</p>
                        <h1 className="text-sm font-semibold text-neutral-200 uppercase tracking-tight">Player Profile</h1>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-neutral-700 bg-neutral-800 flex items-center justify-center text-neutral-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                </div>
            </div>
        </header>
    );
}