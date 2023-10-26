import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { name, email, avatar, nickname } = data;

  if (!email || !nickname) {
    return NextResponse.json("Dados incompletos", { status: 400 });
  }

  try {
    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
        avatar,
        nickname,
      }
    })
  }
}
