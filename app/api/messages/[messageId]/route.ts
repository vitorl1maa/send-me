import { db as prisma } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: { userId: number } }
) {
  try {
    const userId = Number(context.params.userId);

    // Correção: Filtrar mensagens usando 'userId' em vez de 'id'
    const userMessages = await prisma.message.findMany({
      where: { userId: userId },
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
