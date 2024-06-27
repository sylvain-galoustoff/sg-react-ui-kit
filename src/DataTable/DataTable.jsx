import { useEffect, useState } from "react";
import style from "./DataTable.module.scss";
import ColumnName from "./ColumnName";
import TableRow from "./TableRow";

function DataTable({ data, ignore, containerClass }) {
  const [columns, setColumns] = useState();
  const [columnCount, setColumnCount] = useState();

  useEffect(() => {
    const columnsNames = new Set(Object.keys(data[0]));
    if (ignore) {
      ignore.forEach((name) => {
        columnsNames.delete(name);
      });
    }
    setColumns([...columnsNames]);
    setColumnCount(columnsNames.size);
  }, [data]);

  const gridTemplateColumns = {
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
  };

  const renderColumnName = columns && Array.from(columns).map((column) => <ColumnName key={column} label={column} />);
  const renderRows = data.map((row) => <TableRow key={row.id} data={row} gridTemplateColumns={gridTemplateColumns} />);

  return (
    <div className={`${style.container} ${containerClass}`}>
      <div className={`${style.toolbar} toolbar`}>
        <div className="tool">
          <label htmlFor="pagination-select">show</label>
          <select id="pagination-select">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>

        <div className="tool">
          <label htmlFor="search">Search</label>
          <input type="text" id="search" />
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
        <tbody>{renderRows}</tbody>
      </table>
    </div>
  );
}

export default DataTable;
