import { Client } from "@prisma/client";

export const createClient = async (client: Client) => {
  return await fetch("/api/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ client }),
  })
    .then((res) => res.json())
    .then((data) => data.data);
};

export const getClient = async (client: Client) => {
  return await fetch("/api/clients/" + client.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);
};
