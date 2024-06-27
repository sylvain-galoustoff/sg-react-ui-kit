import style from "./DataTable.module.scss";

function TableRow({ gridTemplateColumns, data }) {
  const renderCells = () => {
    let values = { ...data };
    delete values.id;
    values = Object.values(values);
    console.log(values);
    return values.map((cellValue) => <td className={style.td}>{cellValue}</td>);
  };

  return (
    <tr className={`${style.tableRow} table-row`} style={gridTemplateColumns}>
      {renderCells()}
    </tr>
  );
}

export default TableRow;
