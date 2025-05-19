import { registerMutation } from "@/trpc/auth/register.mutation"
import { router } from "@/trpc/lib/trpc"

export const appRouter = router({
  createUser: registerMutation,
})
