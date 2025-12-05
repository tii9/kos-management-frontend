export const getAllTenants = async (token: string) => {
  const res = await fetch("http://localhost:3000/api/tenant", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }

  const json = await res.json();

  // console.log(json.data);

  return json.data ?? [];
};
