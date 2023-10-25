export async function postMessages(content: string, userId: number) {
  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, userId }),
    });

    if (!res.ok) {
      throw new Error("Error ao criar mensagem");
    }
    const newMessage = await res.json();
    return newMessage;
  } catch (error) {
    console.error(error);
  }
}
