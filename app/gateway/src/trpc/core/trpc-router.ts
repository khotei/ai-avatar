import { loginMutation } from "@/trpc/auth/login/login-mutation"
import { registerMutation } from "@/trpc/auth/register/register-mutation"
import { router } from "@/trpc/core/trpc"

export const appRouter = router({
  login: loginMutation,
  register: registerMutation,
})
