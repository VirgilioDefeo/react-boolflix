
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
            id: item.id,
            title: item.title,
            originalTitle: item.original_title,
            language: item.original_language,
            vote_average: item.vote_average,
            poster_path: item.poster_path,
            overview: item.overview,
            type: 'movie',
          }));
          const tvResults = tvRes.data.results.map(item => ({
            id: item.id,
            title: item.name,
            originalTitle: item.original_name,
            language: item.original_language,
            vote_average: item.vote_average,
            poster_path: item.poster_path,
            overview: item.overview,
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
