
const Header = ({ query, setQuery, onSearch }) => {
  return (
    <header className="netflix-header">
      <div className="logo">BoolFlix</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cerca film o serie TV"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button onClick={onSearch}>Cerca</button>
      </div>
    </header>
  );
};

export default Header;