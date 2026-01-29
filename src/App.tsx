import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx'
import Header from './components/Header.tsx';
import PlayerPage from './pages/PlayerPage.tsx';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player/:accountId" element={<PlayerPage />} />
          <Route path="*" element={<div className="text-center py-20">404 – Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
