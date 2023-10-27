export async function getContactsId(userId: number) {
  try {
    const res = await fetch(`/api/contacts?userId=${userId}`);
    if (!res.ok) {
      throw new Error("Erro ao buscar contato");
    }
    const contacts = await res.json();
    return contacts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
