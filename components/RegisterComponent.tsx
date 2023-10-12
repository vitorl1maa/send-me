"use client";

import { Eye, EyeClosed, PaperPlaneTilt } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const tooglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <section className=" bg-[#f2f2f2] h-full px-20 py-10">
      <div className="flex bg-white rounded-xl w-full h-[90vh] shadow-2xl">
        <div className="w-1/2 flex flex-col  items-center container">
          <div className="flex justify-between w-full pt-5">
            <p className="font-extrabold flex items-center">
              <PaperPlaneTilt size={20} weight="fill" color="#EDBA30" />
              SEND <span className="text-[#EDBA30] pl-1"> ME</span>!
            </p>
            <Select>
              <SelectTrigger className="w-[80px] rounded-full ">
                <SelectValue placeholder="PT-BR" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Brasil">
                    <Image
                      src="/flag-for-brazil.svg"
                      width={30}
                      height={30}
                      alt="BR icon"
                    />
                  </SelectItem>
                  <SelectItem value="EUA">
                    <Image
                      src="/flag-for-united-states.svg"
                      width={30}
                      height={30}
                      alt="BR icon"
                    />
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <Avatar className="w-32 h-32 mb-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <form className="flex flex-col gap-5 w-80">
              <div>
                <label htmlFor="">Nome</label>
                <Input placeholder="Nome" type="text" className="mt-2" />
              </div>
              <div>
                <label htmlFor="" className="">
                  Aniversário
                </label>
                <Input type="date" placeholder="aniversário" className="mt-2" />
              </div>
              <div>
                <label htmlFor="" className="">
                  Email
                </label>
                <Input placeholder="email" type="email" className="mt-3" />
              </div>
              <div className="relative">
                <label htmlFor="" className="">
                  Senha
                </label>
                <Input
                  placeholder="senha"
                  type={showPassword ? "text" : "password"}
                  className="mt-3"
                />
                <span
                  className="absolute bottom-2 right-4 cursor-pointer"
                  onClick={tooglePasswordVisibility}
                >
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <Button
                type="submit"
                className="w-full hover:bg-zinc-900/80 hover:translate-y-2"
              >
                Criar
              </Button>
              <p className="text-sm text-center">
                Já possuí uma conta?{" "}
                <Link href="/">
                  <span className="underline cursor-pointer text-blue-700">
                    Entrar
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div>
          <Image
            src="/dance.gif"
            width={800}
            height={1000}
            alt="gif"
            className="rounded-xl h-[90vh] "
          />
        </div>
      </div>
    </section>
  );
};
