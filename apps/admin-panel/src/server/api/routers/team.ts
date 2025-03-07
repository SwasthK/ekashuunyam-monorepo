import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const teamRouter = createTRPCRouter({
  getSingleTeam: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const team = await ctx.db.form.findFirst({
        where: {
          id: input,
        },
        select: {
          teamNmae: true,
          fullTeam: true,
          verfied: true,
          user: {
            select: {
              name: true,
              email: true,
              contact: true,
              college: true,
            },
          },
          events: {
            select: {
              formId: true,
              name: true,
              participants: true,
            },
          },
        },
      });
      if (!team) {
        throw new Error("Team not found");
      }
      return team;
    }),

  getAllTeamOfEvent: protectedProcedure
    .input(
      z.object({
        sortOrder: z.enum(["asc", "desc"]).default("asc"),
        eventName: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const teams = await ctx.db.form.findMany({
        //temporarily removed
        where: {
          // verfied: true,
          events: {
            every: {
              name: input.eventName,
            },
          },
        },
        orderBy: {
          cretedAt: input.sortOrder,
        },
        select: {
          teamNmae: true,
          fullTeam: true,
          verfied: true,
          user: {
            select: {
              name: true,
              email: true,
              contact: true,
              college: true,
            },
          },
          events: {
            select: {
              formId: true,
              name: true,
              participants: true,
            },
          },
        },
      });
      return teams;
    }),

  getAllCollegeTeam: protectedProcedure
    .input(
      z.object({
        sortOrder: z.enum(["asc", "desc"]).default("asc"),
        isVerfied: z.enum(["verified", "notVerified", "all"]).default("all"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const teams = await ctx.db.form.findMany({
        where: {
          ...(input.isVerfied !== "all"
            ? { verfied: input.isVerfied === "verified" }
            : {}),
        },
        orderBy: {
          cretedAt: input.sortOrder,
        },
        select: {
          id: true,
          teamNmae: true,
          fullTeam: true,
          verfied: true,
          user: {
            select: {
              name: true,
              college: true,
            },
          },
        },
      });
      return teams;
    }),

  updateVerifyStatus: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        verifyStatus: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.form.update({
        where: {
          id: input.teamId,
        },
        data: {
          verfied: input.verifyStatus,
        },
      });
      return team;
    }),

  updateTeamName: protectedProcedure
    .input(
      z.object({
        teamId: z.string(),
        newTeamName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.form.update({
        where: {
          id: input.teamId,
        },
        data: {
          teamNmae: input.newTeamName,
        },
      });
      return team;
    }),
});
