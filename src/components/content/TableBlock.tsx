import { MathFormula } from "../math/MathFormula";
import type { TableCell } from "../../content/types";
import styles from "./TableBlock.module.css";

interface TableBlockProps {
  title?: string;
  columns: string[];
  rows: TableCell[][];
  caption?: string;
}

export function TableBlock({ title, columns, rows, caption }: TableBlockProps) {
  return (
    <figure className={`glass-surface-strong ${styles.card}`}>
      {title && <figcaption className={styles.title}>{title}</figcaption>}
      <div className={styles.scroller}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={styles.headCell}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={styles.row}>
                {row.map((cell, j) => (
                  <td key={j} className={styles.cell}>
                    <TableCellContent cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </figure>
  );
}

function TableCellContent({ cell }: { cell: TableCell }) {
  if (typeof cell === "string") return <>{cell}</>;
  return <MathFormula expression={cell.latex} className={styles.cellFormula} />;
}
