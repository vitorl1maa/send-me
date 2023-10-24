import { db as prisma } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: { senderId: number } }
) {
  try {
    const senderId = Number(context.params.senderId);

    const userMessages = await prisma.message.findMany({
      where: { id: senderId },
    });

    if (!userMessages || userMessages.length === 0) {
      return new Response(
        JSON.stringify({ message: "Mensagens não encontradas" }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(userMessages), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    return new Response(
      JSON.stringify({ message: "Error when fetching messages" }),
      {
        status: 500,
      }
    );
  }
}
