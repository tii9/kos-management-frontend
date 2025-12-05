import { useAuth } from "@/hooks/useAuth";
import type { LoginPayload } from "@/types/LoginPayload";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useLogin = () => {
  const { setToken } = useAuth();

  const loginRequest = async (payload: LoginPayload) => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      toast.success("Login Berhasil");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};

export default useLogin;
