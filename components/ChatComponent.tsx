"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  ChatCircleText,
  GearSix,
  MagnifyingGlass,
  Moon,
  PaperPlaneTilt,
  Phone,
  SignOut,
  SquareHalf,
  SunDim,
  UsersThree,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { MessageArea } from "./MessageArea";

interface UserData {
  name: string;
  image: string;
}

export default function ChatComponent() {
  const session = useSession();
  return (
    <>
      {session?.data && (
        <section className="px-3 py-5 h-screen flex gap-5">
          <article className="w-64 flex flex-col justify-between h-full px-5 py-3 bg-slate-300/20 rounded-xl">
            <div className="flex items-center justify-between">
              <Link href="/">
                <p className="font-extrabold flex items-center">
                  <PaperPlaneTilt size={20} weight="fill" color="#EDBA30" />
                  SEND <span className="text-[#EDBA30] pl-1"> ME</span>!
                </p>
              </Link>
              <span className="cursor-pointer">
                <SquareHalf size={32} />
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-xl font-extrabold">Chat</h1>
              <div className="relative">
                {/* <button className="absolute top-2 left-5">
                  <MagnifyingGlass size={22} />
                </button> */}
                <Input className="rounded-full" placeholder="Buscar..." />
              </div>
              <div className="flex flex-col justify-center bg-slate-300/20 h-20 w-52 rounded-md p-2 ">
                <span className="flex items-center gap-3 relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/avatar2.jpg" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="bg-green-500 rounded-full w-3 h-3 absolute top-8 left-9 border border-black " />
                  <div className="flex flex-col justify-center relative w-full">
                    <strong>Vitor Lima</strong>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs">19:30</span>
                      <span className="pr-5">
                        <ChatCircleText size={25} />
                      </span>
                    </div>
                    <span className="absolute left-24 bg-red-500 w-6 h-6 text-center text-white rounded-full">
                      3
                    </span>
                  </div>
                </span>
              </div>
              <div className="flex flex-col justify-center bg-slate-300/20 h-20 w-52 rounded-md p-2 ">
                <span className="flex items-center gap-3 relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/avatar2.jpg" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="bg-green-500 rounded-full w-3 h-3 absolute top-8 left-9 border border-black " />
                  <div className="flex flex-col justify-center relative w-full">
                    <strong>Vitor Lima</strong>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs">19:30</span>
                      <span className="pr-5">
                        <ChatCircleText size={25} />
                      </span>
                    </div>
                    <span className="absolute left-24 bg-red-500 w-6 h-6 text-center text-white rounded-full">
                      3
                    </span>
                  </div>
                </span>
              </div>
              <div className="flex flex-col justify-center bg-slate-300/20 h-20 w-52 rounded-md p-2 ">
                <span className="flex items-center gap-3 relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/avatar2.jpg" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="bg-green-500 rounded-full w-3 h-3 absolute top-8 left-9 border border-black " />
                  <div className="flex flex-col justify-center relative w-full">
                    <strong>Vitor Lima</strong>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs">19:30</span>
                      <span className="pr-5">
                        <ChatCircleText size={25} />
                      </span>
                    </div>
                    <span className="absolute left-24 bg-red-500 w-6 h-6 text-center text-white rounded-full">
                      3
                    </span>
                  </div>
                </span>
              </div>
            </div>

            {/* <ul className="flex flex-col gap-5 pt-10">
              <li className="flex w-52 gap-3 hover:bg-zinc-200/40 px-3 py-2 rounded-md cursor-pointer">
                <Phone size={25} color="#3f95e9" />
                Ligar
              </li>
              <li className="flex w-52 gap-3 hover:bg-zinc-200/40 px-3 py-2 rounded-md cursor-pointer">
                <UsersThree size={25} color="#3ccc70" />
                Grupos
              </li>
              <li className="flex w-52 gap-3 hover:bg-zinc-200/40 px-3 py-2 rounded-md cursor-pointer">
                <GearSix size={25} color="#7649c2" />
                Configurações
              </li>
              <li className="flex w-52 gap-3 hover:bg-zinc-200/40 px-3 py-2 rounded-md cursor-pointer">
                <SignOut size={25} color="#f5540f" />
                Sair
              </li>
            </ul> */}

            <div className="pt-20 max-h-full">
              <div className="flex flex-col justify-center bg-slate-300/20 h-24 w-52 rounded-md p-2">
                <span className="flex items-center gap-3 relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/avatar2.jpg" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="bg-green-500 rounded-full w-3 h-3 absolute top-8 left-9 border border-black " />
                  <div className="flex flex-col justify-center">
                    <strong>Vitor Lima</strong>
                    <span>online</span>
                  </div>
                </span>
              </div>

              <div className="w-52 pt-5">
                <Tabs>
                  <TabsList className="grid w-full grid-cols-2 bg-slate-300/20">
                    <TabsTrigger value="account">
                      <SunDim size={20} weight="fill" />
                      Claro
                    </TabsTrigger>
                    <TabsTrigger value="password">
                      <Moon size={20} weight="fill" />
                      Escuro
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </article>
          <MessageArea />
        </section>
      )}
    </>
  );
}
