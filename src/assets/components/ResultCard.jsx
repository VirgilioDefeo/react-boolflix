
import "./ResultCard.css"
const ResultCard = ({ item }) => {
  const title = item.title || item.name;
  const originalTitle = item.original_title || item.original_name;
  const language = item.original_language;
  const vote = Math.round(item.vote_average / 2); // 0–5 stellel
  console.log(item);
  

 const imageUrl = item.poster_path
  ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
  : 'https://via.placeholder.com/342x513/000000/FFFFFF?text=No+Image';

  const flagUrl = `https://flagcdn.com/w40/${language === 'en' ? 'gb' : language}.png`;

  return (
    <div className="card fade-in">
      <div className="poster-wrapper">
        <img src={imageUrl} alt={title} className="poster" />
        <div className="overlay">
          <p className="overview">{item.overview || "Nessuna descrizione disponibile."}</p>
        </div>
      </div>
      <div className="info">
        <h3>{title}</h3>
        <p className="original-title">{originalTitle}</p>
        <div className="meta">
          <img className="flag" src={flagUrl} alt={language} />
          <div className="stars">{'★'.repeat(vote)}{'☆'.repeat(5 - vote)}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
