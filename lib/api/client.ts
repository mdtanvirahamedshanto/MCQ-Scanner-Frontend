import axios from "axios";

const V1_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_V1_URL || "http://localhost:8000/v1";

export function v1Client(accessToken?: string) {
  const client = axios.create({
    baseURL: V1_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
  return client;
}
