import { registerMutation } from "@/trpc/auth/register/register-mutation"
import { router } from "@/trpc/lib/trpc"

export const appRouter = router({
  register: registerMutation,
})
