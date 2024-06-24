import React from "react";
import { IoSearch } from "react-icons/io5";

const DataSearch = ({ data }) => {
  return (
    <div>
      <input type="text" />
      <div className="addon">
        <IoSearch />
      </div>
    </div>
  );
};

export default DataSearch;
