"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import {
  CircleNotch,
  Eye,
  EyeClosed,
  PaperPlaneTilt,
  Spinner,
} from "@phosphor-icons/react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastAction } from "./ui/toast";
import { toast } from "./ui/use-toast";

interface Iuser {
  email: string;
  password: string;
}

export const LoginComponent = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Iuser>({
    email: "",
    password: "",
  });

  const tooglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      toast({
        title: "😖 Ops... Erro ao fazer login",
        description: res.error,
        variant: "destructive",
        action: (
          <ToastAction altText={"Tente Novamente!"}>
            Tente Novamente!
          </ToastAction>
        ),
      });
    } else {
      console.log("Erro:", res?.error);
      router.push("/chat");
    }
    setData({
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <section className=" bg-[#f2f2f2] h-full lg:px-20 lg:py-10">
      <div className="flex bg-white rounded-xl w-full h-screen lg:h-[90vh] shadow-2xl">
        <div className="lg:w-1/2 flex flex-col  items-center container">
          <div className="flex justify-between w-full pt-5">
            <Link href="/">
              <p className="font-extrabold flex items-center">
                <PaperPlaneTilt size={20} weight="fill" color="#EDBA30" />
                SEND <span className="text-[#EDBA30] pl-1"> ME</span>!
              </p>
            </Link>
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
            <div className="flex flex-col lg:flex-row gap-2">
              <Button
                onClick={() => signIn("google", { callbackUrl: "/chat" })}
                className="flex w-80 lg:w-52 items-center hover:translate-y-2 gap-2 bg-transparent hover:bg-slate-300/30 transition text-textPrimary border border-neutral-800/20"
              >
                <Image
                  src="google (1).svg"
                  width={20}
                  height={30}
                  alt="icon google"
                />
                Entrar com Google
              </Button>
              <Button
                onClick={() => signIn("github", { callbackUrl: "/chat" })}
                className="flex w-80 lg:w-52 items-center hover:translate-y-2 gap-2 bg-transparent hover:bg-slate-300/30 transition text-textPrimary border border-neutral-800/20"
              >
                <Image
                  src="github-light.svg"
                  width={20}
                  height={30}
                  alt="icon facebook"
                />
                Entrar com GitHub
              </Button>
            </div>
            <form className="flex flex-col gap-5 w-80" onSubmit={handleSubmit}>
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
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
              <div className="relative">
                <label htmlFor="" className="">
                  Senha
                </label>
                <Input
                  id="password"
                  placeholder="Senha"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
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
                disabled={isLoading}
                className="w-full hover:bg-zinc-900/80 hover:translate-y-2"
              >
                {isLoading && (
                  <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                )}
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
        <div className="hidden lg:flex">
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
