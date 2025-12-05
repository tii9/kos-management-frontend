import type { RoomType } from "@/types/RoomType";
import { createColumnHelper, type Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import DeleteRoomDialog from "@/components/room/DeleteRoomDialog";
import UpdateRoomFormDialog from "@/components/room/UpdateRoomFormDialog";

const columnHelper = createColumnHelper<RoomType>();

export const roomTableColumn = [
  columnHelper.accessor("room_number", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          No. Kamar
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("price_per_month", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga per Bulan
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(info.getValue()),
    enableSorting: true,
  }),
  columnHelper.accessor("is_available", {
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ketersediaan
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: (info) => {
      const value = info.getValue();
      return value ? (
        <span className="bg-green-600 px-2 py-0.5 rounded-full block w-fit mx-auto text-white">
          Tersedia
        </span>
      ) : (
        <span className="bg-red-600 mx-auto w-fit px-2 py-0.5 rounded-full block text-white">
          Tidak Tersedia
        </span>
      );
    },
    enableSorting: true,
  }),
  columnHelper.accessor("created_at", {
    header: () => <div className="text-center">Dibuat pada</div>,
    cell: (info) => {
      const date = new Date(info.getValue() ?? new Date());
      const idDate = date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      return <span className="block w-fit mx-auto">{idDate}</span>;
    },
    enableSorting: false,
  }),
  {
    id: "actions",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }: { row: Row<RoomType> }) => {
      const data = row.original;
      return (
        <div className="flex gap-2 justify-center ">
          <UpdateRoomFormDialog data={data} />

          <DeleteRoomDialog id={data.id} />
        </div>
      );
    },
    enableSorting: false,
  },
];
