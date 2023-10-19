export async function fetchUser(userId: number) {
  try {
    const res = await fetch(`/api/users/${userId}`);
    if (!res.ok) {
      throw new Error("Erro ao buscar usuário");
    }
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
