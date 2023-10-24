export async function getMessages(userId: number) {
  try {
    const res = await fetch(`/api/messages?userId=${userId}`);
    if (!res.ok) {
      throw new Error("Erro ao buscar mensagens");
    }
    const messages = await res.json();
    return messages;
  } catch (error) {
    console.error(error);
    return [];
  }
}
