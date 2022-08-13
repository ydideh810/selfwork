import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET one project
  // RETURN: a project
  if (req.method === "GET") {
    try {
      const prisma = new PrismaClient();
      await prisma.$connect();
      const { id } = req.body;
      const project = await prisma.project.findUnique({
        where: {
          id: id,
        },
      });
      res.status(200).json(project);
      await prisma.$disconnect();
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  }

  // UPDATE a project
  // RETURN: the updated project
  if (req.method === "PUT") {
    try {
      const prisma = new PrismaClient();
      await prisma.$connect();
      const { projectData } = req.body;
      const project = await prisma.project.update({
        where: {
          id: projectData.id,
        },
        data: {
          ...projectData,
        },
      });
      res.status(200).json(project);
      await prisma.$disconnect();
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE a project
  // RETURN: the deleted project
  if (req.method === "DELETE") {
    try {
      const prisma = new PrismaClient();
      await prisma.$connect();
      const { id } = req.body;
      const project = await prisma.project.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(project);
    } catch (error: Error | any) {
      res.status(400).json({ error: error.message });
    }
  }

  res.status(400).json({ error: "Request Not Allowed" });
}
