import style from "./DataTable.module.scss";

function DataTable({ containerClass }) {
  return (
    <div className={`${style.container} ${containerClass}`}>
      <div className={`toolbar ${style.toolbar}`}>
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

      <table className="table">
        <thead className="table-header">
          <tr className="table-row" id="pagination">
            <td>Showing X of XXX entries</td>
            <td>
              <span className="page-button">Previous</span>

              <span className="page-button">Next</span>
            </td>
          </tr>
          <tr className="table-row" id="sorters"></tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default DataTable;
