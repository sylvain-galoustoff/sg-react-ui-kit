function SearchResult({ resultName, setSelection }) {
  const handleSelection = () => {
    setSelection(resultName);
  };

  return <p onClick={handleSelection}>{resultName}</p>;
}

export default SearchResult;
