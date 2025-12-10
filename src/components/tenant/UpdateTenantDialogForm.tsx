import { getAvailableRoom } from "@/api/room/getAvailableRoom";
import { updateTenant } from "@/api/tenant/updateTenant";
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
import type { TenantType } from "@/types/TenantsType";
import {
  UpdateTenantSchema,
  type UpdateTenantPayload,
} from "@/types/UpdateTenantPayload";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircleIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const UpdateTenantDialogForm = ({ data }: { data: TenantType }) => {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: UpdateTenantPayload) => updateTenant(payload),
    onSuccess: () => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Berhasil edit data");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const { data: availableRoom = [] } = useQuery<RoomType[]>({
    queryKey: ["room"],
    queryFn: () => getAvailableRoom(token),
    refetchOnWindowFocus: false,
  });

  const form = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      phone: data.phone,
      is_active: data.is_active ? "Aktif" : "Tidak Aktif",
      roomId: data.roomId ? data.roomId : null,
      token,
    },
    validators: {
      onSubmit: UpdateTenantSchema,
    },
    onSubmit: ({ value }) => {
      const { id, name, phone, is_active, roomId, token } = value;

      // const isUnchanged =
      //   room_number == data.room_number &&
      //   price_per_month == data.price_per_month &&
      //   is_available == (data.is_available ? "Tersedia" : "Tidak Tersedia");

      // if (isUnchanged) {
      //   toast.error("Tidak ada perubahan");
      //   return;
      // }
      mutate({ id, name, phone, is_active, roomId, token });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form
          id="update-tenant-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Nama Penyewa</FieldLabel>
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
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>No. HP</FieldLabel>
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
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="is_active"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Keaktifan</FieldLabel>
                      <Select
                        defaultValue={field.state.value}
                        onValueChange={(e) => field.handleChange(e)}
                      >
                        <SelectTrigger
                          id={field.name}
                          name={field.name}
                          disabled={isPending}
                        >
                          <SelectValue placeholder={"Pilih keaktifan"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Tidak Aktif">
                            Tidak Aktif
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="roomId"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Kamar Tersedia
                      </FieldLabel>
                      <Select
                        defaultValue={field.state.value || undefined}
                        onValueChange={(e) => field.handleChange(e)}
                      >
                        <SelectTrigger
                          id={field.name}
                          name={field.name}
                          disabled={isPending}
                        >
                          <SelectValue placeholder="Pilih kamar" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoom.map((room) => (
                            <SelectItem key={room.id} value={room.id}>
                              {room.room_number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </div>
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
              form="update-tenant-form"
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

export default UpdateTenantDialogForm;
