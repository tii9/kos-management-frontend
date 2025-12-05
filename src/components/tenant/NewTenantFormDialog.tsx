import { insertNewTenant } from "@/api/tenant/insertNewTenant";
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
import { indonesianPhone } from "@/lib/indonesiaPhoneValidator";
import type { NewTenantPayload } from "@/types/NewTenantPayload";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

const TenantSchema = z.object({
  name: z.string().min(1, "nama penyewa wajib diisi"),
  // phone: z.string().min(1, "no hp wajib diisi"),
  phone: indonesianPhone,
  token: z.string(),
});

const NewTenantFormDialog = () => {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: NewTenantPayload) => insertNewTenant(payload),
    onSuccess: () => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Berhasil menambahkan data penyewa");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      token,
    },
    validators: {
      onSubmit: TenantSchema,
    },
    onSubmit: ({ value }) => {
      const { name, phone, token } = value;
      mutate({ name, phone, token });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Tambah Penyewa</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md md:w-full">
        <DialogHeader>
          <DialogTitle>Tambah Penyewa</DialogTitle>
          <DialogDescription>
            Masukkan informasi penyewa baru. Pastikan data sudah lengkap sebelum
            menyimpan.
          </DialogDescription>
        </DialogHeader>
        <form
          id="create-tenant-form"
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
                      // disabled={isPending}
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
                      // disabled={isPending}
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
          <Field orientation="horizontal" className="grid grid-cols-2 lg:block">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="w-full lg:w-fit lg:mr-2"
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="create-tenant-form"
              className="cursor-pointer w-full lg:w-fit"
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

export default NewTenantFormDialog;
