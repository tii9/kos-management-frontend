import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import type { TenantType } from "@/types/TenantsType";

const Searchbar = ({ table }: { table: Table<TenantType> }) => {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <Input
        type="text"
        placeholder="Cari penyewa..."
        className="pl-9 w-full"
        value={table.getColumn("name")?.getFilterValue() as string | undefined}
        onChange={(e) =>
          table.getColumn("name")?.setFilterValue(e.target.value)
        }
      />
    </div>
  );
};

export default Searchbar;
