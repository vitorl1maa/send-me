export async function getMessages(senderId: number) {
  try {
    const res = await fetch(`/api/messages?senderId=${senderId}`);
    if (!res.ok) {
      throw new Error("Erro ao buscar usúario");
    }
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.error(error);
    return;
  }
}
