import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [accountId, setAccountId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = accountId.trim();
    if (!trimmed) {
      setError('Please enter a Steam account ID');
      return;
    }
    if (!/^\d+$/.test(trimmed)) {
      setError('Account ID should contain only numbers');
      return;
    }
    setError('');
    navigate(`/player/${trimmed}`);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Find Dota 2 Player Statistics
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          placeholder="Steam 32-bit Account ID (e.g. 86745912)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {error && <p className="mt-3 text-red-600 text-center">{error}</p>}

      <p className="mt-8 text-center text-gray-600 text-sm">
        Not sure about your ID? Use sites like <a href="https://www.dotabuff.com/players" target="_blank" className="text-blue-600 hover:underline">Dotabuff</a> or <a href="https://stratz.com/" target="_blank" className="text-blue-600 hover:underline">STRATZ</a> to find it.
      </p>
    </div>
  );
}