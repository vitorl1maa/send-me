"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChatCircleText } from "@phosphor-icons/react";
import { MessageArea } from "./MessageArea";

interface UserData {
  id: number;
  avatar: string;
  image: string;
  name: string;
}

interface UserCardProps {
  userData: UserData;
}

export const UserCard = ({ userData }: UserCardProps) => {
  const sliceName =
    userData?.name.length > 9
      ? userData.name.slice(0, 9) + "..."
      : userData.name;

  const handleUserCardClick = () => {
    // Chame uma função para abrir o bate-papo com o usuário clicado
    MessageArea.openChatWithUser(userData.id, userData.name);
  };

  return (
    <div
      className="flex flex-col justify-center bg-slate-300/20 h-20 w-52 rounded-md p-2 cursor-pointer"
      onClick={handleUserCardClick}
    >
      <span className="flex items-center gap-3 relative">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={userData?.avatar || userData?.image || "/avatar_default.jpeg"}
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <span className="bg-green-500 rounded-full w-3 h-3 absolute top-8 left-9 border border-black " />
        <div className="flex flex-col justify-center relative w-full">
          <div className="flex justify-between">
            <strong>{sliceName}</strong>
            <span className="text-xs">Sex • 27</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-xs">Vamos almo...</span>
            <span className="pr-1">
              <ChatCircleText size={25} />
            </span>
          </div>
          <span className="absolute top-5 left-28 bg-bgDefault w-[22px] h-[22px] text-center text-white rounded-full">
            3
          </span>
        </div>
      </span>
    </div>
  );
};
