import { deleteRoom } from "@/api/room/deleteRoom";
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
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeleteRoomDialog = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteRoom(id, token),
    onSuccess: () => {
      setOpen(false);
      toast.success("Berhasil menghapus data");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <TrashIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Data Kamar</DialogTitle>
          <DialogDescription>
            Data yang dihapus tidak dapat dipulihkan. Lanjutkan?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Batal</Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"destructive"}
            onClick={() => mutate(id)}
            disabled={isPending}
          >
            Hapus Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoomDialog;
