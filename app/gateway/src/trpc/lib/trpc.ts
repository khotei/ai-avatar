import { initTRPC } from "@trpc/server"

const trpc = initTRPC.create()

export const { router } = trpc
export const publicProcedure = trpc.procedure
