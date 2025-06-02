import { loginMutation } from "@/rpc/auth/login/login-mutation"
import { registerMutation } from "@/rpc/auth/register/register-mutation"
import { createAvatarMutation } from "@/rpc/avatar/create-avatar/create-avatar-mutation"
import { rpc } from "@/rpc/core/rpc"

export const appRouter = rpc.router({
  createAvatar: createAvatarMutation,
  login: loginMutation,
  register: registerMutation,
})
