import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import style from "./DataTable.module.scss";

function ColumnName({ label }) {
  return (
    <th className={`${style.th} columnName`}>
      <span className={style.sortButtons}>
        <IoCaretUp />
        <IoCaretDown />
      </span>
      <span className={style.columnLabel}>{label}</span>
    </th>
  );
}

export default ColumnName;
