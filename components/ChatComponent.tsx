"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

interface UserData {
  name: string;
  image: string;
}

export default function ChatComponent() {
  const session = useSession();
  return <div>{session?.data && <h1>Chat</h1>}</div>;
}
