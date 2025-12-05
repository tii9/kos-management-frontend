import { insertNewRoom } from "@/api/room/insertNewRoom";
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
import { useAuth } from "@/hooks/useAuth";
import type { InsertNewRoomPayload } from "@/types/InsertNewRoomPayload";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

const RoomSchema = z.object({
  room_number: z.string().min(1, "nomor kamar wajib diisi"),
  price_per_month: z.number().min(1, "harga per bulan tidak boleh kosong"),
  token: z.string(),
});

const CreateRoomForm = () => {
  const [open, setOpen] = useState(false);

  const { token } = useAuth();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: InsertNewRoomPayload) => insertNewRoom(payload),
    onSuccess: () => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Berhasil menambahkan data");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      room_number: "",
      price_per_month: 0,
      token,
    },
    validators: {
      onSubmit: RoomSchema,
    },
    onSubmit: ({ value }) => {
      const { room_number, price_per_month, token } = value;
      mutate({ room_number, price_per_month, token });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>+ Add Room</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Kamar Baru</DialogTitle>
            <DialogDescription>
              Isi detail kamar yang ingin ditambahkan ke dalam sistem. Pastikan
              semua data sudah benar sebelum menyimpan.
            </DialogDescription>
          </DialogHeader>
          <form
            id="create-room-form"
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
                name="token"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="bg-red-400 m-0">
                      <Input id={field.name} name={field.name} type="hidden" />
                    </Field>
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
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button
                type="submit"
                form="create-room-form"
                className="cursor-pointer"
                disabled={isPending}
              >
                {isPending && <LoaderCircleIcon className="animate-spin" />}
                Submit
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateRoomForm;
