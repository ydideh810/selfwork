import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const taskListRouter = router({
  // Get all
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.taskList.findMany();
  }),
  //   Get one
  getOne: publicProcedure
    .input(z.object({ taskListId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.taskList.findUnique({
        where: {
          id: input.taskListId,
        },
      });
    }),
  // Create one
  createOne: publicProcedure
    .input(
      z.object({
        taskList: z.object({
          name: z.string(),
          notes: z.string(),
          userId: z.string(),
          projectId: z.string(),
          projectName: z.string(),
        }),
      })
    )
    .query(({ input, ctx }) => {
      const taskListData = {
        name: input.taskList.name,
        notes: input.taskList.notes,
        userId: input.taskList.userId,
        project: {
          connect: {
            id: input.taskList.projectId,
            name: input.taskList.projectName,
          },
        },
      };
      return ctx.prisma.taskList.create({
        data: { ...input.taskList },
      });
    }),
  // Delete one
  deleteOne: publicProcedure
    .input(z.object({ taskListId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.taskList.delete({
        where: {
          id: input.taskListId,
        },
      });
    }),
  // Update one
  updateOne: publicProcedure
    .input(
      z.object({
        taskListId: z.string(),
        newTaskListData: z.object({
          name: z.string(),
          notes: z.string(),
          userId: z.string(),
          projectId: z.string(),
        }),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.taskList.update({
        where: {
          id: input.taskListId,
        },
        data: {
          ...input.newTaskListData,
        },
      });
    }),
});
