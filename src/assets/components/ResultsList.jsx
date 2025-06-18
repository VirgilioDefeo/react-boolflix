import { useRef } from 'react';
import ResultCard from './ResultCard';

const ResultsList = ({ results }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const amount = 500;

    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="slider-wrapper">
      <button className="slider-arrow left" onClick={() => scroll('left')}>‹</button>

      <div className="scroll-container" ref={containerRef}>
        {results.map(item => (
          <ResultCard key={`${item.type}-${item.id}`} item={item} />
        ))}
      </div>

      <button className="slider-arrow right" onClick={() => scroll('right')}>›</button>
    </div>
  );
};

export default ResultsList;
