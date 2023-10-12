"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { Eye, EyeClosed, PaperPlaneTilt } from "@phosphor-icons/react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const LoginComponente = () => {
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
            <h1 className="text-center text-8xl font-extrabold">Olá!</h1>
            <p className="py-5 text-lg">Seja bem vindo a nossa comunidade</p>
            <form className="flex flex-col gap-5 w-80">
              <Button className="flex w-full items-center hover:translate-y-2 gap-2 bg-transparent hover:bg-slate-300/30 transition text-textPrimary border border-neutral-800/20">
                <Image
                  src="google (1).svg"
                  width={20}
                  height={30}
                  alt="icon google"
                />
                Entrar com Google
              </Button>
              <Button className="flex w-full items-center hover:translate-y-2 gap-2 bg-transparent hover:bg-slate-300/30 transition text-textPrimary border border-neutral-800/20">
                <Image
                  src="facebook.svg"
                  width={20}
                  height={30}
                  alt="icon facebook"
                />
                Entrar com Facebook
              </Button>
              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>
              <div>
                <label htmlFor="">Email</label>
                <Input placeholder="email" className="mt-2" />
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
                Entrar
              </Button>
              <p className="text-sm text-center">
                Ainda não possuí uma conta?{" "}
                <Link href="/register">
                  <span className="underline cursor-pointer text-blue-700">
                    Criar conta
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div>
          <Image
            src="/ticken_run.gif"
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
