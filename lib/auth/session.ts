import { Session } from "next-auth";

export function getBackendAccessToken(session: Session | null | undefined): string | undefined {
  return session?.backendAccessToken;
}
