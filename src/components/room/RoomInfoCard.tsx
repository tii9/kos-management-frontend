import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { TenantType } from "@/types/TenantsType";
import type { Row } from "@tanstack/react-table";

const RoomInfoCard = ({ data }: { data: Row<TenantType> }) => {
  const { room_number, price_per_month = 0 } = data.original.room ?? {};
  const price_IDRFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price_per_month);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-foreground">
          {room_number}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Info Kamar</DialogTitle>
          <DialogDescription>Informasi singkat kamar.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2">
          <div>
            <h3 className="text-muted-foreground font-medium">No Kamar</h3>
            <h3 className="text-muted-foreground font-medium">
              Harga Sewa per Bulan
            </h3>
          </div>
          <div>
            <h3 className="font-semibold">{room_number}</h3>
            <h3 className="font-semibold">{price_IDRFormat}</h3>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoomInfoCard;
