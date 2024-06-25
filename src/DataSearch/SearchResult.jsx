import style from "./DataSearch.module.scss";

function SearchResult({ resultName, setSelection }) {
  const handleSelection = () => {
    setSelection(resultName);
  };

  return (
    <p className={style.resultItem} onClick={handleSelection}>
      {resultName}
    </p>
  );
}

export default SearchResult;
