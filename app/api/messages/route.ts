import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { content, userId, imageUrl } = data;

  if (!content || !userId) {
    return NextResponse.json("Dados incompletos", { status: 400 });
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        content,
        imageUrl,
        userId,
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error("Erro ao criar mensagem", error);
    return NextResponse.json("Erro ao criar mensagem", { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50, // Limite para as 50 mensagens mais recentes, por exemplo.
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json("Erro ao encontrar mensagem", { status: 500 });
  }
}
