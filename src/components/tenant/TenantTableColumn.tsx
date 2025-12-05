import type { TenantType } from "@/types/TenantsType";
import { createColumnHelper, type Row } from "@tanstack/react-table";
import DeleteTenantDialog from "@/components/tenant/DeleteTenantDialog";
import UpdateTenantDialogForm from "@/components/tenant/UpdateTenantDialogForm";

const columnHelper = createColumnHelper<TenantType>();

export const tenantTableColumn = [
  columnHelper.accessor("name", {
    header: "Nama",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
    enableSorting: true,
  }),
  columnHelper.accessor("phone", {
    header: "No. HP",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
    enableSorting: false,
  }),
  columnHelper.accessor("is_active", {
    header: () => <div className="text-center">Status Aktif</div>,
    cell: (info) => {
      const value = info.getValue();
      return value ? (
        <span className="bg-green-600 px-2 py-0.5 rounded-full block w-fit mx-auto text-white">
          Aktif
        </span>
      ) : (
        <span className="bg-red-600 mx-auto w-fit px-2 py-0.5 rounded-full block text-white">
          Tidak Aktif
        </span>
      );
    },
    enableSorting: true,
  }),
  columnHelper.accessor("room.room_number", {
    header: "Kamar Disewa",
    cell: ({ row }) => row.original.room?.room_number ?? "-",
    enableSorting: true,
  }),
  columnHelper.accessor("start_date", {
    header: "Tanggal Menyewa",
    cell: ({ row }) => row.original.start_date ?? "-",
    enableSorting: false,
  }),
  columnHelper.accessor("next_payment_date", {
    header: "Tenggat Bayar",
    cell: ({ row }) => row.original.next_payment_date ?? "-",
    enableSorting: false,
  }),
  columnHelper.accessor("payment_status", {
    header: "Status Pembayaran",
    cell: ({ row }) => row.original.payment_status ?? "-",
    enableSorting: true,
  }),
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }: { row: Row<TenantType> }) => {
      const data = row.original;
      return (
        <div className="flex gap-2 justify-center ">
          <UpdateTenantDialogForm />

          <DeleteTenantDialog id={data.id} />
        </div>
      );
    },
    enableSorting: false,
  },
];
