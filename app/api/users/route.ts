import {db as prisma} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest) {

  const data = await req.json()
  const {image, name, email, date, password} = data

  if(!name || !email || !password) {
    return NextResponse.json('Dados inválidos.', {status: 400})
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  if(isUserExists){
    return NextResponse.json({error: "Email já existente"}, {status: 400});
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data:{
      image,
      name,
      date,
      email,
      hashedPassword
    }
  })

  return NextResponse.json(user)
}