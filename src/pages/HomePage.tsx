import SearchBar from '../components/SearchBar';
import Card from '../components/Card'

export default function HomePage() {

  return (
    <Card className="max-w-xl mx-auto px-10 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-neutral-200">
        Find Player Statistics
      </h2>

      <SearchBar size="w-xl max-w-120"/>

      <p className="mt-8 text-center text-gray-600 text-sm">
        Not sure about your ID? Use <a href="https://www.dotabuff.com/players" target="_blank" className="text-blue-600 hover:underline">Dotabuff</a> or <a href="https://stratz.com/" target="_blank" className="text-blue-600 hover:underline">STRATZ</a> to find it.
      </p>
    </Card>
  );
}