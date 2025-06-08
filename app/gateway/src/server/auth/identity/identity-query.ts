import { protectedProcedure } from "@/server/rpc/rpc"

export const identityQuery = protectedProcedure.query(
  async (opts) => {
    const {
      ctx: { user },
    } = opts

    return user
  }
)
