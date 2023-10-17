import { NextRequest, NextResponse } from "next/server";
import {db as prisma} from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const {content, userId} = req.body;

  if (!content || !userId) {
    return NextResponse.json("Dados incompletos", {status: 400})
    
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId: userId // Ajustado para coincidir com o modelo do Prisma
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    return NextResponse.json("Erro ao criar mensagem", {status:500})
  }
}


export async function GET(req: NextRequest) {
   try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limite para as 50 mensagens mais recentes, por exemplo.
    })
    NextResponse.json(messages)
   } catch (error) {
    NextResponse.json("Erro ao encontrar mensagem", {status:500})
   }
}