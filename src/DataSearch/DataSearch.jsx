import React, { useState, useEffect } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import SearchResult from "./SearchResult";
import style from "./DataSearch.module.scss";

const DataSearch = ({ data, containerClass, inputClass, addonClass, resultClass, placeholder, callback }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const handleKeypress = (e) => {
      console.log(e);
      if (e.keyCode === 27 || e.key === "Escape") {
        closeResults();
      }
    };

    window.addEventListener("keydown", handleKeypress);

    return () => {
      window.removeEventListener("keydown", handleKeypress);
    };
  }, [isFocused]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    const result = data.filter((item) => item.toLowerCase().startsWith(e.target.value.toLowerCase()));
    setFilteredData(result);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
  };

  const setSelection = (state) => {
    setInputValue(state);
    setIsFocused(false);
    callback(state);
  };

  const closeResults = () => {
    setIsFocused(false);
  };

  const renderFilteredData = filteredData.map((item) => (
    <SearchResult key={item} resultName={item} setSelection={setSelection} />
  ));

  return (
    <div className={`${style.container} ${containerClass}`}>
      <input
        type="text"
        className={`${style.input} ${inputClass}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <div className={`${style.addon} ${addonClass}`}>
        <IoSearch />
      </div>
      {isFocused && (
        <div className={`${style.results} ${resultClass}`}>
          <p className={style.closeResults} onClick={closeResults}>
            [ESC] key or click to close <IoClose />
          </p>
          {filteredData.length > 0 ? renderFilteredData : <SearchResult resultName="Aucun résultat" />}
        </div>
      )}
    </div>
  );
};

export default DataSearch;
