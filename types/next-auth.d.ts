import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    backendAccessToken?: string;
    backendUser?: {
      id: number;
      email: string;
      role: string;
      profile_completed: boolean;
    };
    user: DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendAccessToken?: string;
    backendUser?: {
      id: number;
      email: string;
      role: string;
      profile_completed: boolean;
    };
  }
}
