export const deleteTenant = async (id: string, token: string) => {
  const res = await fetch(`http://localhost:3000/api/tenant/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Gagal menghapus data");

  return res.json();
};
