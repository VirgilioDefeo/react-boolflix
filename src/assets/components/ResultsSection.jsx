import ResultsList from './ResultsList';

const ResultsSection = ({ title, results }) => {
  if (!results.length) return null;

  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <ResultsList results={results} />
    </section>
  );
};

export default ResultsSection;
