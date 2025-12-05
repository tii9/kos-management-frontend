import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilIcon } from "lucide-react";

const UpdateTenantDialogForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PencilIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:w-full">
        <DialogHeader>
          <DialogTitle>Update Data Penyewa</DialogTitle>
          <DialogDescription>
            Mohon lengkapi dan pastikan semua data penyewa sudah benar sebelum
            menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTenantDialogForm;
