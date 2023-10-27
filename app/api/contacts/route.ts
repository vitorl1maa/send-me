import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { name, avatar, nickname, email, userId } = data;

  if (!email || !nickname) {
    return NextResponse.json("Dados incompletos", { status: 400 });
  }

  try {
    const newContact = await prisma.contact.create({
      data: {
        name,
        avatar,
        nickname,
        email,
        userId,
      },
    });
    return NextResponse.json(newContact);
  } catch (error) {
    return NextResponse.json("Erro ao adicionar contato", { status: 500 });
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json("Erro ao encontrar contato", { status: 500 });
  }
}
