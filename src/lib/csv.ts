export function toCsv(rows: readonly (readonly unknown[])[]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const value = cell == null ? "" : String(cell);
          const safeValue = /^[\t\r ]*[=+\-@]/.test(value) ? `'${value}` : value;
          return `"${safeValue.replaceAll('"', '""')}"`;
        })
        .join(","),
    )
    .join("\r\n");
}
