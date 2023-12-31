"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  ChatCircleText,
  CircleNotch,
  CornersOut,
  MagnifyingGlass,
  Moon,
  PaperPlaneTilt,
  SquareHalf,
  SunDim,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { MessageArea } from "./MessageArea";
import { useTheme } from "next-themes";
import { ButtonFullScreen } from "./ButtonFullScreen";
import { SkeletonDemo } from "./Skeleton";
import { getUsers } from "@/utils/getUsers";
import { Button } from "./ui/button";
import { UserCard } from "./UserCard";
import { postContacts } from "@/utils/postContacts";
import { getContactsId } from "@/utils/getContactsId";

interface UserData {
  id: number;
  name: string;
  image: string;
  email: string;
  avatar: string;
  nickname: string;
}

interface ChatProps {
  name: string;
}

export default function ChatComponent() {
  const { data: session, status } = useSession();
  const { setTheme } = useTheme();
  const positionRef = useRef<HTMLDivElement | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = session?.user?.id;
  const [searchTerm, setSearchTerm] = useState("");
  const [foundUser, setFoundUser] = useState<UserData | null>(null);
  const [contacts, setContacts] = useState<UserData[]>([]);

  const Chatposition = () => {
    if (positionRef.current) {
      positionRef.current.classList.toggle("flex-row-reverse");
    }
  };

  useEffect(() => {
    if (session && session.user && session.user.id) {
      const userIdString = session.user.id; // Obtenha o ID do usuário como uma string
      const userId = parseInt(userIdString);

      if (!isNaN(userId)) {
        fetch(`api/users/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            setUserData(data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("Erro ao buscar usuário", error);
          });
      }

      const sessionUserId = session?.user?.id;
      if (sessionUserId !== undefined) {
        const sessionId = parseInt(sessionUserId);
        getContactsId(sessionId)
          .then((contacts) => {
            // Filtrar os contatos com base no userId da sessão
            const sessionUserContacts = contacts.filter(
              (contact: any) => contact.userId === sessionId
            );

            // Armazenar os contatos filtrados no estado
            setContacts(sessionUserContacts);
          })
          .catch((error) => {
            console.error("Erro ao buscar contatos:", error);
          });
      }
    }
  }, [session]);

  function normalize(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const handleSearch = async () => {
    try {
      const users = await getUsers(); // Busque todos os usuários (pode personalizar isso)
      const user = users.find(
        (u: any) => u.nickname === searchTerm || u.email === searchTerm
      );

      if (user) {
        setFoundUser(user); // Defina o usuário encontrado no estado
        console.log("Nome do usuário encontrado", user.name);
      } else {
        console.log("Usuário não encontrado");
        setFoundUser(null); // Limpe o estado se o usuário não for encontrado
      }
    } catch (error) {
      console.error("Erro ao buscar usários:", error);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddUser = async () => {
    if (foundUser) {
      // Verifica se o usuário já está na lista de contatos
      if (
        !contacts.find((contact) => contact.nickname === foundUser.nickname)
      ) {
        setContacts((prevContacts) => [...prevContacts, foundUser]);
      }

      try {
        if (userId !== undefined) {
          const userIdNumber = parseInt(userId);
          if (!isNaN(userIdNumber)) {
            await postContacts(
              foundUser.name,
              foundUser.avatar,
              foundUser.nickname,
              foundUser.email,
              userIdNumber
            );
          }
        }
      } catch (error) {
        console.error("Erro ao adcionar o contato na lista");
      }
      setFoundUser(null);
    }
  };

  return (
    <React.Fragment>
      {session && (
        <section className="px-3 py-5 h-screen flex gap-5" ref={positionRef}>
          <>
            <article className="w-64 flex flex-col justify-between h-full px-5 py-3 bg-slate-300/30 dark:bg-black rounded-xl">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <p className="font-extrabold flex items-center">
                    <PaperPlaneTilt size={20} weight="fill" color="#EDBA30" />
                    SEND <span className="text-[#EDBA30] pl-1"> ME</span>!
                  </p>
                </Link>
                <div className="flex gap-2">
                  <span className="cursor-pointer" onClick={Chatposition}>
                    <SquareHalf size={25} />
                  </span>
                  <ButtonFullScreen />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-extrabold">Chat</h1>
                <div className="relative">
                  <Input
                    className="rounded-full"
                    placeholder="Buscar..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyUp={handleKeyUp}
                  />
                  <button className="absolute top-2 right-3 bg-inherit">
                    <MagnifyingGlass size={22} onClick={handleSearch} />
                  </button>
                </div>

                <div className="flex gap-2 justify-center items-center ">
                  <>
                    {isLoading ? (
                      <CircleNotch className="mr-2 h-10 w-10 animate-spin" />
                    ) : (
                      <p
                        className={`text-xs ${
                          !foundUser
                            ? ""
                            : "text-xs bg-bgDefault/30 py-2 px-3 rounded-md"
                        } py-2 px-3 rounded-md`}
                      >
                        {foundUser?.name}
                      </p>
                    )}
                    {!foundUser ? (
                      ""
                    ) : (
                      <button
                        className="bg-green-500/30 text-green-500  rounded-md text-xs py-2 px-3 "
                        onClick={handleAddUser}
                      >
                        Adcionar
                      </button>
                    )}
                  </>
                </div>
                {contacts.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {contacts.map((contact) => (
                      <UserCard key={contact.id} userData={contact} />
                    ))}
                  </div>
                )}
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
                {!isLoading ? (
                  <div className="flex  flex-col justify-center bg-slate-300/20 h-24 w-52 rounded-md p-2">
                    <span className="flex items-center gap-3 relative">
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
                      <div className="flex flex-col justify-center">
                        <strong>{userData ? userData?.name : ""} </strong>
                        <span className="text-xs">
                          {userData ? userData?.nickname : ""}
                        </span>
                      </div>
                    </span>
                  </div>
                ) : (
                  <>
                    <SkeletonDemo />
                  </>
                )}

                <div className="w-52 pt-5">
                  <Tabs>
                    <TabsList className="grid w-full grid-cols-2 bg-slate-300/20">
                      <TabsTrigger
                        value="account"
                        onClick={() => setTheme("light")}
                        className="flex gap-2"
                      >
                        <SunDim size={20} weight="fill" />
                        Claro
                      </TabsTrigger>
                      <TabsTrigger
                        value="password"
                        onClick={() => setTheme("dark")}
                        className="flex gap-2"
                      >
                        <Moon size={15} weight="fill" />
                        Escuro
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </article>
          </>
          {session && userId && (
            <MessageArea userId={parseInt(userId as string)} />
          )}
        </section>
      )}
    </React.Fragment>
  );
}
