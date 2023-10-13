"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

interface UserData {
  name: string;
  image: string;
}

export default function ChatComponent() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch(`/api/users/${session.user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do usuário:", error);
        });
    }
    setIsLoading(false);
  }, [session]);
  return <div>{session ? <h1>Chat</h1> : <></>}</div>;
}
