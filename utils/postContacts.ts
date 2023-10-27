export async function postContacts(
  name: string,
  avatar: string,
  nickname: string,
  email: string,
  userId: number
) {
  try {
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        avatar,
        email,
        nickname,
        userId,
      }),
    });
    if (!res.ok) {
      throw new Error("Erro em adicionar usuário");
    }
    const newContact = await res.json();
    return newContact;
  } catch (error) {
    console.error(error);
  }
}
