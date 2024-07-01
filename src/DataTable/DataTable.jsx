import { useEffect, useState } from "react";
import style from "./DataTable.module.scss";
import ColumnName from "./ColumnName";
import TableRow from "./TableRow";

function DataTable({ data, ignore, containerClass }) {
  const [columns, setColumns] = useState();
  const [columnCount, setColumnCount] = useState();

  const [searchTerms, setSearchTerms] = useState("");

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const columnsNames = new Set(Object.keys(data[0]));
    if (ignore) {
      ignore.forEach((name) => {
        columnsNames.delete(name);
      });
    }
    setColumns([...columnsNames]);
    setColumnCount(columnsNames.size);
    setFilteredEmployees(data);
  }, [data]);

  const gridTemplateColumns = {
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
  };

  const handleSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchTerms(inputValue);

    function findTerms(term) {
      return data.filter((item) => {
        return Object.values(item).some((value) => {
          return value.toString().toLowerCase().includes(term.toLowerCase());
        });
      });
    }

    if (inputValue.length > 0) {
      const searchResult = findTerms(inputValue);
      if (searchResult.length > 0) {
        setFilteredEmployees(searchResult);
      } else {
        setFilteredEmployees(data);
      }
    } else {
      setFilteredEmployees(data);
    }
  };

  const handleSort = (criterias) => {
    const { label, direction } = criterias;
    const formatedLabel = label.split(" ").join("").toLowerCase();
    const sortResult = [...filteredEmployees];

    if (direction === "asc") {
      sortResult.sort((a, b) => a[formatedLabel].localeCompare(b[formatedLabel]));
    } else if (direction === "desc") {
      sortResult.sort((a, b) => b[formatedLabel].localeCompare(a[formatedLabel]));
    }
    setFilteredEmployees(sortResult);
  };

  const renderColumnName =
    columns &&
    Array.from(columns).map((column) => <ColumnName key={column} changeSortBy={handleSort} label={column} />);
  const renderRows =
    filteredEmployees &&
    Object.keys(filteredEmployees).map((key) => (
      <TableRow key={key} data={filteredEmployees[key]} ignore={ignore} gridTemplateColumns={gridTemplateColumns} />
    ));

  return (
    <div className={`${style.container} ${containerClass}`}>
      <div className={`${style.toolbar} toolbar`}>
        <div className={`${style.tool} tool`}>
          <label htmlFor="pagination-select">show</label>
          <select id="pagination-select">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>

        <div className={`${style.tool} tool`}>
          <label htmlFor="search">Search</label>
          <input type="text" id="search" value={searchTerms} onChange={handleSearch} />
        </div>
      </div>

      <table className={`${style.table} table`}>
        <thead className={`${style.tableHeader} table-header`}>
          <tr className={`${style.pagination} table-pagination`}>
            <td className={style.td}>Showing X of XXX entries</td>
            <td className={style.td}>
              <span className={`${style.pageButton} page-button`}>Previous</span>
              <span className={`${style.pageButton} page-button`}>Next</span>
            </td>
          </tr>
          <tr className={`${style.tableRow} ${style.columnsName} table-row`} style={gridTemplateColumns}>
            {renderColumnName}
          </tr>
        </thead>
        <tbody className={`${style.tableBody} table-body`}>{filteredEmployees.length > 0 && renderRows}</tbody>
      </table>
    </div>
  );
}

export default DataTable;
