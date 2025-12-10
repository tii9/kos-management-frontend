import type { TenantType } from "@/types/TenantsType";
import type { CellContext } from "@tanstack/react-table";

export const TableColumnDateFormat = ({
  info,
}: {
  info: CellContext<TenantType, Date | undefined>;
}) => {
  const raw = info.getValue();
  const date = raw ? new Date(raw) : null;

  const idDate =
    date && !isNaN(date.getTime())
      ? date.toLocaleString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "-";

  return <span>{idDate}</span>;
};
