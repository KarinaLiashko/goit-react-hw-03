export default function SearchBox({ query, onSearch }) {
  const handleChange = event => {
    onSearch(event.target.value);
  };

  return (
    <>
      <p>Find contacts by name</p>
      <input type="text" value={query} onChange={handleChange} />
    </>
  );
}
