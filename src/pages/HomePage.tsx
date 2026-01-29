import SearchBar from '../components/SearchBar';

export default function HomePage() {

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-neutral-200">
        Find Player Statistics
      </h2>

      <SearchBar />

      <p className="mt-8 text-center text-gray-600 text-sm">
        Not sure about your ID? Use sites like <a href="https://www.dotabuff.com/players" target="_blank" className="text-blue-600 hover:underline">Dotabuff</a> or <a href="https://stratz.com/" target="_blank" className="text-blue-600 hover:underline">STRATZ</a> to find it.
      </p>
    </div>
  );
}