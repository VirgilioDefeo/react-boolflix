
import { useState } from 'react';
import Header from "./assets/components/Header"
import ResultsSection from './assets/components/ResultsSection';
import axios from 'axios';
import "./App.css"




function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchAll = () => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)


    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;


    const movieUrl = `${baseUrl}/movie?api_key=${apiKey}&language=it-IT&query=${query}`;
    const tvUrl = `${baseUrl}/tv?api_key=${apiKey}&language=it-IT&query=${query}`;

    axios.all([
      axios.get(movieUrl),
      axios.get(tvUrl),
    ])
      .then(
        axios.spread((movieRes, tvRes) => {
const movieResults = movieRes.data.results.map(item => ({
  ...item,
  type: 'movie',
}));

const tvResults = tvRes.data.results.map(item => ({
  ...item,
  type: 'tv',
}));

          setResults([...movieResults, ...tvResults]);
          setLoading(false);
        })
      )
      .catch(() => {
        setError('Errore durante la ricerca');
        setLoading(false);
      });
  }

  return (
    <>
      <Header query={query} setQuery={setQuery} onSearch={searchAll} setResults={setResults} setLoading={setLoading} setError={setError} />
<ResultsSection title="Film" results={results.filter(r => r.type === 'movie')} />
<ResultsSection title="Serie TV" results={results.filter(r => r.type === 'tv')} />


    </>
  )
}

export default App
