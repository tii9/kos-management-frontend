import { updateRoom } from "@/api/room/updateRoom";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import type { RoomType } from "@/types/RoomType";
import {
  UpdateRoomSchema,
  type UpdateRoomPayload,
} from "@/types/UpdateRoomPayload";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircleIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UpdateRoomFormDialog = ({ data }: { data: RoomType }) => {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const queryClient = useQueryClient();
  const { mutate, isPending, status } = useMutation({
    mutationFn: (payload: UpdateRoomPayload) => updateRoom(payload),
    onSuccess: () => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      console.log(status);
      toast.success("Berhasil edit data");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      id: data.id,
      room_number: data.room_number,
      price_per_month: Number(data.price_per_month),
      is_available: data.is_available ? "Tersedia" : "Tidak Tersedia",
      token,
    },
    validators: {
      onSubmit: UpdateRoomSchema,
    },
    onSubmit: ({ value }) => {
      const { id, room_number, price_per_month, is_available, token } = value;

      const isUnchanged =
        room_number == data.room_number &&
        price_per_month == data.price_per_month &&
        is_available == (data.is_available ? "Tersedia" : "Tidak Tersedia");

      if (isUnchanged) {
        toast.error("Tidak ada perubahan");
        return;
      }
      mutate({ id, room_number, price_per_month, is_available, token });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PencilIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Data Kamar</DialogTitle>
          <DialogDescription>
            Mohon lengkapi dan pastikan semua data kamar sudah benar sebelum
            menyimpan perubahan.
          </DialogDescription>
        </DialogHeader>
        <form
          id="update-room-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="room_number"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Nomor Kamar</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      disabled={isPending}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="price_per_month"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Harga per Bulan
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(parseInt(e.target.value))
                      }
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      type="number"
                      disabled={isPending}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="is_available"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Ketersediaan</FieldLabel>
                    <Select
                      defaultValue={field.state.value}
                      onValueChange={(e) => field.handleChange(e)}
                    >
                      <SelectTrigger
                        id={field.name}
                        name={field.name}
                        disabled={isPending}
                      >
                        <SelectValue placeholder="Pilih ketersediaan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tersedia">Tersedia</SelectItem>
                        <SelectItem value="Tidak Tersedia">
                          Tidak Tersedia
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
            <form.Field
              name="id"
              children={(field) => {
                return (
                  <Input id={field.name} name={field.name} type="hidden" />
                );
              }}
            />
            <form.Field
              name="token"
              children={(field) => {
                return (
                  <Input id={field.name} name={field.name} type="hidden" />
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="update-room-form"
              className="cursor-pointer"
              disabled={isPending}
            >
              {isPending && <LoaderCircleIcon className="animate-spin" />}
              Submit
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoomFormDialog;
