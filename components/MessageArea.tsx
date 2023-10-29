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
import { postMessages } from "@/utils/postMessages";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { format } from "date-fns";

interface MessageProps {
  userId: number;
  name?: string;
}

interface Message {
  id: number;
  content: string;
  createdAt: string;
}

interface EmojiProps {
  unified: string;
}

export const MessageArea = ({ userId }: MessageProps) => {
  const [userData, setUserData] = useState<any>(null);
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtenha o userId da sessão (substitua pelo método correto de obtenção do userId da sessão)
        const sessionUserId = userId;

        const user = await fetchUser(sessionUserId);
        setUserData(user);

        // Buscando todas as mensagens
        const allMessages = await getMessages(userId);
        setUserMessages(allMessages);
        setIsLoading(false);

        // Filtrando as mensagens do usuário da sessão
        const sessionUserMessages = allMessages.filter(
          (message: any) => message.userId === sessionUserId
        );

        // Armazenando as mensagens no estado
        setUserMessages(sessionUserMessages);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMessages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessages(e.target.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const newMessage = await postMessages(messages, userId);
      setUserMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    }

    setMessages("");
  };

  const handleEmojiClick = () => {
    setShowEmoji(!showEmoji);
  };

  const addEmoji = (emoji: EmojiProps) => {
    const sym = emoji.unified.split("_");
    const codeArray: string[] = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let newEmoji = String.fromCodePoint(
      ...codeArray.map((code) => Number(code))
    );
    setMessages(messages + newEmoji);
  };

  return (
    <article className="flex flex-col justify-between w-full h-full bg-slate-300/30 dark:bg-black rounded-xl ">
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
          <Input placeholder="Mensagem..." className="h-12" type="text" />

          <span className="cursor-pointer hover:translate-y-2 transition-all">
            <Paperclip size={27} className="text-black dark:text-white" />
          </span>

          <span className="cursor-pointer hover:translate-y-2 transition-all">
            <Smiley size={27} className="text-black dark:text-white" />
          </span>

          <Button
            className={`${
              messages === ""
                ? "hidden"
                : "bg-bgDefault hover:bg-bgDefault/30 hover:translate-y-2 transition-all"
            }`}
          >
            <PaperPlaneTilt size={27} weight="fill" />
          </Button>
        </div>
      </section>
      <section className="max-h-[850px] overflow-y-auto">
        <nav className="flex justify-between items-center rounded-t-md shadow-[-1px 5px 47px -6px rgba(230, 230, 230, 1)] bg-slate-200 dark:bg-zinc-800 py-3 px-5 fixed max-w-full w-[81%] ">
          <div className="flex items-center gap-3">
            {!isLoading ? (
              <>
                <span className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={
                        userData?.avatar ||
                        userData?.image ||
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

        <div className="px-5 pt-32 w-full flex" id="my-msg">
          <div className="w-1/2">
            <div className="relative">
              <span className="bg-white text-black px-4 py-3 rounded-full rounded-bl-xl">
                Bom dia, tudo bem ?
              </span>
            </div>
          </div>
          <div className="w-1/2 flex justify-end mt-20 pb-10">
            {!isLoading ? (
              <>
                <div className="flex flex-col gap-4 items-end pr-5">
                  {userMessages.map((message) => (
                    <p
                      className="bg-slate-300/20  dark:text-white px-4 py-3 rounded-full rounded-br-xl flex flex-col justify-center w-fit"
                      key={message.id}
                    >
                      {message.content}
                      <span className="text-xs flex items-end justify-end w-full pl-5 pt-2">
                        {format(new Date(message.createdAt), "HH:mm")}
                      </span>
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <span className="flex flex-col gap-2 items-end">
                <Skeleton className="h-12 w-36 rounded-full rounded-br-xl mt-2 bg-slate-300 dark:bg-muted" />
                <Skeleton className="h-12 w-20 rounded-full rounded-br-xl mt-2 bg-slate-300 dark:bg-muted" />
              </span>
            )}
          </div>
        </div>
      </section>
      <section>
        <form
          className="w-full pb-10 px-8 flex gap-5 items-center justify-center"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Mensagem..."
            type="text"
            name="message"
            value={messages}
            onChange={handleMessages}
            className="h-14"
          />

          <span className="cursor-pointer hover:translate-y-2 transition-all">
            <Paperclip size={27} className="text-black dark:text-white" />
          </span>

          <span
            className="cursor-pointer hover:translate-y-2 transition-all"
            onClick={handleEmojiClick}
          >
            <Smiley size={27} className="text-black dark:text-white" />
          </span>

          <Button
            className={`${
              messages === ""
                ? "hidden"
                : "bg-bgDefault hover:bg-bgDefault/30 hover:translate-y-2 transition-all"
            }`}
            onClick={handleEmojiClick}
          >
            <PaperPlaneTilt size={27} weight="fill" />
          </Button>
          {showEmoji && (
            <div className="absolute top-52">
              <Picker data={data} onEmojiSelect={addEmoji} />
            </div>
          )}
        </form>
      </section>
    </article>
  );
};
