// src/assets/components/utils/TopTenList.jsx
import "./TopTenList.css";

const TopTenList = ({ results }) => {
  return (
    <div className="top-ten-section">
      <h2>Top 10</h2>
      <div className="top-ten-list">
        {results.map((item, index) => (
          <div key={item.id} className="top-ten-card">
            <span className="top-number">{index + 1}</span>
            <img
              src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
              alt={item.title || item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTenList;
