import style from "./DataTable.module.scss";

function ColumnName({ label }) {
  return <th className={`${style.th} columnName`}>{label}</th>;
}

export default ColumnName;
