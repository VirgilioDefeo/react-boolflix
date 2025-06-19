import { useState, useEffect } from 'react';
import Header from "./assets/components/Header";
import ResultsSection from './assets/components/ResultsSection';
import HeroBanner from "./assets/components/utils/HeroBanner";
import TopTenList from "./assets/components/utils/TopTenList"
import axios from 'axios';
import './App.css';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchAll = () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    const movieUrl = `${baseUrl}/movie?api_key=${apiKey}&language=it-IT&query=${query}`;
    const tvUrl = `${baseUrl}/tv?api_key=${apiKey}&language=it-IT&query=${query}`;

    axios.all([
      axios.get(movieUrl),
      axios.get(tvUrl)
    ])
      .then(axios.spread((movieRes, tvRes) => {
        const movieResults = movieRes.data.results.map(item => ({ ...item, type: 'movie' }));
        const tvResults = tvRes.data.results.map(item => ({ ...item, type: 'tv' }));
        setResults([...movieResults, ...tvResults]);
      }))
      .catch(() => setError("Errore durante la ricerca"))
      .finally(() => setLoading(false));
  };

  return (
    <>
    
      <Header
        query={query}
        setQuery={setQuery}
        onSearch={searchAll}
        setResults={setResults}
        setLoading={setLoading}
        setError={setError}
      />
  <HeroBanner /> {/* Banner in alto */}
<TopTenList results={results.slice(0, 10)} />

      {loading && <p className="center">Caricamento...</p>}
      {error && <p className="center error">{error}</p>}
      <ResultsSection
        title="Film"
        results={results.filter(r => r.type === 'movie')}
      />
      <ResultsSection
        title="Serie TV"
        results={results.filter(r => r.type === 'tv')}
      />
    </>
  );
}

export default App;
