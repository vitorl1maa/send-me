import { db as prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, nickname, email, date, password, avatar, messages } = data;

  if (!name || !email || !password) {
    return NextResponse.json("Dados inválidos.", { status: 400 });
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isUserExists) {
    return NextResponse.json({ error: "Email já existente" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      nickname,
      date,
      email,
      hashedPassword,
      avatar,
    },
  });

  return NextResponse.json(user);
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuários", error);
    return NextResponse.json("Erro ao buscar usuários", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
