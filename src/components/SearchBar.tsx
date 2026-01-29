import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    const trimmed = accountId.trim();
    if(!trimmed) {
      setError("Please enter a valid SteamID");
      setAccountId("");
      return;
    }
    setError("");
    navigate(`/player/${trimmed}`);
  }

  return (
    <input
    type="text"
    value={accountId}
    onChange={(e) => setAccountId(e.target.value)}
    placeholder={!error ? "Enter SteamID (e.g. 86745912)" : error}
    className="flex-1 px-4 py-3 border border-neutral-200 bg-neutral-700 rounded-lg focus:outline-none focus:bg-neutral-800 placeholder:text-gray-400"
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    />
  );
}
