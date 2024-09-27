"use client";

import { SessionProvider } from "next-auth/react";

const SessionProviderWrapper = ({ children, session }: any) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;