import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  size?: string;
}

export default function SearchBar({ size }: SearchBarProps) {
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    const trimmed = accountId.trim();
    if (!trimmed) {
      setError("Please enter a valid SteamID");
      setAccountId("");
      return;
    }
    setError("");
    navigate(`/player/${trimmed}`);
  }

  return (
    <div className={`relative flex items-center ${size || ""}`}>
      {/* Icon Overlay */}
      <div className="absolute left-4 text-neutral-500 pointer-events-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        placeholder={!error ? "Search SteamID..." : error}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className={`
            w-full pl-11 pr-4 py-2.5
            bg-neutral-950/50 border border-neutral-700
            rounded-xl text-neutral-200 placeholder:text-neutral-600
            transition-all duration-200
            focus:outline-none focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 focus:bg-neutral-900
            ${error ? "border-red-600 bg-red-950/20 placeholder:text-red-400" : ""}
        `}
      />

      {/* Enter Key Visual Hint */}
      <div className="absolute right-3 hidden lg:block px-1.5 py-0.5 border border-neutral-700 rounded bg-neutral-800 text-[10px] text-neutral-500 font-mono pointer-events-none">
        ENTER
      </div>
    </div>
  );
}