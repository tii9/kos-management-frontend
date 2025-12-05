import TablePagination from "@/components/TablePagination";
import NewTenantFormDialog from "@/components/tenant/NewTenantFormDialog";
import Searchbar from "@/components/tenant/Searchbar";
import { tenantTableColumn } from "@/components/tenant/TenantTableColumn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TenantType } from "@/types/TenantsType";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";

const TenantTable = ({ data }: { data: TenantType[] }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const table = useReactTable({
    data,
    columns: tenantTableColumn,
    state: { columnFilters, pagination },

    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="grid gap-6">
      <section className="flex justify-between">
        <Searchbar table={table} />
        <NewTenantFormDialog />
      </section>
      <div className="grid gap-4">
        <Table className="table-auto min-w-full lg:table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  data tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export default TenantTable;
