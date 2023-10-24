"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  CaretLeft,
  PaperPlaneTilt,
  Paperclip,
  Phone,
  Smiley,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DotsThreeOutlineVertical } from "@phosphor-icons/react/dist/ssr/DotsThreeOutlineVertical";
import { fetchUser } from "@/utils/fetchUser";
import { SkeletonDemo } from "./Skeleton";
import { getMessages } from "@/utils/getMessages";
import { Skeleton } from "./ui/skeleton";

interface MessageProps {
  userId: number;
  senderId: number;
  name?: string;
}

interface Message {
  id: number;
  content: string;
}

export const MessageArea = ({ userId }: MessageProps) => {
  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário", error);
      });

    async function fetchData() {
      try {
        const userResponse = await fetchUser(userId);
        setUserData(userResponse);

        if (userResponse && userResponse.id) {
          // Por exemplo, se o senderId é o ID do usuário.
          const messagesData = await getMessages(userResponse.id);
          setMessages(messagesData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <article className="flex flex-col justify-between w-full h-full bg-slate-300/30 dark:bg-black rounded-xl">
      <section className="hidden  flex-col h-full items-center justify-center gap-5">
        <div className="flex flex-col h-full items-center justify-center gap-5">
          <Image
            src="/message-wallpaper.png"
            width={400}
            height={400}
            alt="ilustração 3D"
          />
          <h1 className="text-xl font-extrabold">Uauu, que vazio...</h1>
        </div>
        <div className="w-full pb-10 px-8 flex gap-5 items-center justify-center">
          <Input placeholder="Mensagem..." className="h-12" />

          <span className="cursor-pointer hover:translate-y-2 transition-all">
            <Paperclip size={27} className="text-black dark:text-white" />
          </span>

          <span className="cursor-pointer hover:translate-y-2 transition-all">
            <Smiley size={27} className="text-black dark:text-white" />
          </span>

          <Button className="bg-bgDefault hover:bg-bgDefault/30 hover:translate-y-2 transition-all">
            <PaperPlaneTilt size={27} />
          </Button>
        </div>
      </section>
      <section>
        <nav className="flex justify-between items-center rounded-t-md shadow-[-1px 5px 47px -6px rgba(230, 230, 230, 1)] bg-slate-300/30 py-3 px-5">
          <div className="flex items-center gap-3">
            {!isLoading ? (
              <>
                <span className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={
                        userData?.avatar ||
                        userData.image ||
                        "/avatar_default.jpeg"
                      }
                    />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <span className="bg-green-500 rounded-full w-3 h-3 absolute top-8 left-9 border border-black " />
                </span>
                <p className="font-extrabold">
                  {userData ? userData.name : ""}
                </p>
              </>
            ) : (
              <SkeletonDemo />
            )}
          </div>
          <ul className="flex gap-5">
            <li>
              <Phone size={25} />
            </li>
            <li>
              <DotsThreeOutlineVertical size={25} />
            </li>
          </ul>
        </nav>

        <div className="px-5 pt-10 w-full flex" id="my-msg">
          <div className="w-1/2">
            <div className="relative">
              <span className="bg-white text-black px-4 py-3 rounded-full rounded-bl-xl">
                Bom dia, tudo bem ?
              </span>
            </div>
          </div>
          <div className="w-1/2 flex justify-end mt-20">
            {!isLoading ? (
              <>
                <div className="flex flex-col gap-4">
                  {messages.map((message) => (
                    <span
                      className="bg-bgDefault text-black px-4 py-3 rounded-full rounded-br-xl"
                      key={message.id}
                    >
                      {message.content}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <Skeleton className="h-12 w-36 rounded-full rounded-br-xl mt-2 bg-slate-300 dark:bg-muted" />
              </>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="w-full pb-10 px-8 flex gap-5 items-center justify-center">
          <Input placeholder="Mensagem..." className="h-12" />

          <span className="cursor-pointer hover:translate-y-2 transition-all">
            <Paperclip size={27} className="text-black dark:text-white" />
          </span>

          <span className="cursor-pointer hover:translate-y-2 transition-all">
            <Smiley size={27} className="text-black dark:text-white" />
          </span>

          <Button className="bg-bgDefault hover:bg-bgDefault/30 hover:translate-y-2 transition-all">
            <PaperPlaneTilt size={27} />
          </Button>
        </div>
      </section>
    </article>
  );
};
