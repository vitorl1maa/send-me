"use client";

import {
  CircleNotch,
  Eye,
  EyeClosed,
  PaperPlaneTilt,
  PlusCircle,
  User,
  UserCirclePlus,
} from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { redirect, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

interface UserRegister {
  name: string;
  email: string;
  date: string;
  password: string;
  avatar: string | ArrayBuffer | null;
}

export const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const avatarRef = useRef<HTMLInputElement | null>(null);
  const [avatarURL, setAvatarURL] = useState<string>("");
  const [data, setData] = useState<UserRegister>({
    name: "",
    email: "",
    date: "",
    password: "",
    avatar: "",
  });
  const { toast } = useToast();
  const [randomImage, setRandomImage] = useState<number>(0);
  const images = [
    "/ticken_run.gif",
    "/hello.gif",
    "/dance.gif",
    "/turist.gif",
    "/love_message.gif",
  ];

  useEffect(() => {
    const randomImage = Math.floor(Math.random() * images.length);
    setRandomImage(randomImage);
  }, [randomImage]);

  const tooglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    const req = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await req.json();

    console.log("USER REGISTER FORM", res);

    if (!req.ok) {
      toast({
        title: "Erro",
        description: res.error,
        variant: "destructive",
        action: (
          <ToastAction altText="Tente Novamente!">Tente Novamente!</ToastAction>
        ),
      });
    } else {
      console.log("Erro:", res?.error);
      router.push("/");
    }

    console.log(req);

    setData({
      name: "",
      email: "",
      date: "",
      password: "",
      avatar: "",
    });
    setIsLoading(false);
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Verificação adicional para garantir que e.target não é nulo
    if (!e.target || !e.target.files) return;

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setAvatarURL(URL.createObjectURL(selectedFile));

      // Use FileReader para converter a imagem em base64
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setData((prev) => ({
            ...prev,
            avatar: event.target!.result, // Atualiza com a string base64
          }));
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAddPhotoClick = () => {
    // Aciona o clique no input de arquivo ao clicar no botão "Adicionar foto"
    if (avatarRef.current) {
      avatarRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  console.log(data);

  return (
    <section className=" bg-[#f2f2f2] text-black h-full lg:px-20 lg:py-10">
      <div className="flex bg-white rounded-xl w-full h-screen lg:h-[90vh] shadow-2xl">
        <div className="w-full lg:w-1/2 flex flex-col  items-center container">
          <div className="flex justify-between w-full pt-5">
            <Link href="/">
              <p className="font-extrabold flex items-center">
                <PaperPlaneTilt size={20} weight="fill" color="#EDBA30" />
                SEND <span className="text-[#EDBA30] pl-1"> ME</span>!
              </p>
            </Link>
            {/* <Select>
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
            </Select> */}
          </div>
          <div className="flex flex-col justify-center items-center h-full ">
            <Avatar className="w-32 h-32 relative bg-none ">
              {avatarURL ? (
                <AvatarImage src={avatarURL} className="z-30" />
              ) : (
                <AvatarFallback className="bg-bgPrimary"></AvatarFallback>
              )}
            </Avatar>
            <button
              onClick={handleAddPhotoClick}
              className="absolute top-[140px] lg:top-[175px] "
            >
              <UserCirclePlus size={32} />
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-80">
              <Input
                id="avatar"
                type="file"
                className="hidden"
                name="avatar"
                ref={avatarRef}
                onChange={handleAvatarChange}
              />
              <div>
                <label htmlFor="">Nome</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nome"
                  type="text"
                  disabled={isLoading}
                  value={data.name}
                  onChange={handleChange}
                  className="mt-2 bg-transparent border-zinc-400/30"
                />
              </div>
              <div>
                <label htmlFor="" className="">
                  Aniversário
                </label>
                <Input
                  id="date"
                  type="date"
                  disabled={isLoading}
                  name="date"
                  value={data.date}
                  onChange={handleChange}
                  className="mt-2 bg-transparent border-zinc-400/30"
                />
              </div>
              <div>
                <label htmlFor="" className="">
                  Email
                </label>
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
                  className="mt-2 bg-transparent border-zinc-400/30"
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
                  className="mt-2 bg-transparent border-zinc-400/30"
                />
                <span
                  className="absolute bottom-2 right-4 cursor-pointer"
                  onClick={tooglePasswordVisibility}
                >
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-900/80 hover:translate-y-2">
                {isLoading && (
                  <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                )}
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
        <div className="hidden lg:flex">
          <Image
            src={images[randomImage]}
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
