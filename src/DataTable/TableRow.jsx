import { useEffect, useState } from "react";
import style from "./DataTable.module.scss";

function TableRow({ gridTemplateColumns, data, ignore }) {
  const [displayData, setDisplayData] = useState();

  useEffect(() => {
    const dataCopy = { ...data };
    if (ignore) {
      ignore.forEach((key) => {
        delete dataCopy[key];
      });
    }
    setDisplayData(dataCopy);
  }, [data, ignore]);

  const renderCells =
    displayData &&
    Object.keys(displayData).map((key) => (
      <td key={key} className={style.td}>
        {displayData[key]}
      </td>
    ));

  return (
    <tr className={`${style.tableRow} table-row`} style={gridTemplateColumns}>
      {renderCells}
    </tr>
  );
}

export default TableRow;
