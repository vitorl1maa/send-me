import { db as prisma } from "@/lib/db";

export async function GET(
  request: Request,
  context: { params: { userId: number } }
) {
  try {
    const userId = Number(context.params.userId);

    const userContact = await prisma.contact.findMany({
      where: { userId: userId },
    });

    if (!userContact || userContact.length === 0) {
      return new Response(
        JSON.stringify({ message: "Contato não encontrado" }),
        { status: 400 }
      );
    }
    return new Response(JSON.stringify(userContact));
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    return new Response(JSON.stringify({ message: "Erro ao buscar contato" }), {
      status: 500,
    });
  }
}
