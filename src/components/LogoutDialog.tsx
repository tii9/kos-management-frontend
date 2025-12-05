import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";

const LogoutDialog = () => {
  const { logout } = useAuth();

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Konfirmasi Logout</DialogTitle>
        <DialogDescription>
          Apakah Anda yakin ingin keluar dari akun ini? Semua sesi aktif akan
          berakhir setelah Anda logout.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Batal</Button>
        </DialogClose>
        <Button type="submit" variant={"destructive"} onClick={logout}>
          Logout
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default LogoutDialog;
