import SearchBar from './SearchBar';

export default function Header() {
    return (
        <header className="bg-gradient-to-r from-neutral-850 to-neutral-800 text-white flex items-center justify-start gap-20">
            <span className="max-w-1/3 px-4 py-5">
                <h1 className="text-3xl font-bold">Dota Tracker</h1>
            </span>
            <SearchBar />
        </header>
    )
}