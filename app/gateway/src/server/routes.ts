import { loginMutation } from "@/server/auth/login/login-mutation"
import { registerMutation } from "@/server/auth/register/register-mutation"
import { createAvatarMutation } from "@/server/avatar/create-avatar/create-avatar-mutation"
import { router } from "@/server/rpc/rpc"

export const routes = router({
  createAvatar: createAvatarMutation,
  login: loginMutation,
  register: registerMutation,
})
