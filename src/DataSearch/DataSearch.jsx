import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import style from "./DataSearch.module.scss";

const DataSearch = ({ data, containerClass, inputClass, addonClass, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`${style.container} ${containerClass}`}>
      <input
        type="text"
        className={`${style.input} ${inputClass}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      <div className={`${style.addon} ${addonClass}`}>
        <IoSearch />
      </div>
    </div>
  );
};

export default DataSearch;
