import type { Helyetesites, NewHelyetesites } from "./types.ts";

const API_BASE_URL = "https://retoolapi.dev/yYvtRx/data";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`API hiba: ${res.status} ${res.statusText}`);
  }
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export async function getHelyetesitesek(): Promise<Helyetesites[]> {
  const res = await fetch(API_BASE_URL);
  return handleResponse<Helyetesites[]>(res);
}

export async function createHelyetesites(Helyetesites: NewHelyetesites): Promise<Helyetesites> {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Helyetesites),
  });
  return handleResponse<Helyetesites>(res);
}

export async function deleteHelyetesites(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
}
