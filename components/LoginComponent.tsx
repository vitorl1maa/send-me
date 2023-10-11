"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { PaperPlaneTilt } from "@phosphor-icons/react";

export const LoginComponente = () => {
  return (
    <section className=" bg-[#f2f2f2] h-full px-20 py-10">
      <div className="flex bg-white rounded-xl w-full h-[90vh] shadow-2xl">
        <div className="w-1/2 flex flex-col  items-center container">
          <div className="flex justify-between w-full pt-5">
            <span className="font-extrabold flex items-center">
              <PaperPlaneTilt size={20} weight="fill" />
              SAND ME!
            </span>
            <button>🇧🇷</button>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-center text-8xl font-extrabold">Olá!</h1>
            <p className="py-5 text-lg">Seja bem vindo a nossa comunidade</p>
            <form className="flex flex-col gap-5 w-80">
              <Button className="flex w-full items-center hover:translate-y-2 gap-2 bg-transparent hover:bg-slate-500/30 text-textPrimary border border-neutral-800/20">
                <Image
                  src="google (1).svg"
                  width={20}
                  height={30}
                  alt="icon google"
                />
                Entrar com google
              </Button>
              <div className="relative py-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>
              <Input placeholder="email" />
              <Input placeholder="senha" />
              <Button className="w-full hover:bg-zinc-900/80 hover:translate-y-2">
                Entrar
              </Button>
              <p className="text-sm text-center">
                Ainda não possuí uma conta?{" "}
                <span className="underline cursor-pointer text-blue-700">
                  Criar conta
                </span>
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
