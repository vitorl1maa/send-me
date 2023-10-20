export async function getUsers() {
  try {
    const res = await fetch(`/api/users`);
    if (!res.ok) {
      throw new Error("Erro ao buscar usúario");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}
