import { identityQuery } from "@/server/auth/identity/identity-query"
import { loginMutation } from "@/server/auth/login/login-mutation"
import { registerMutation } from "@/server/auth/register/register-mutation"
import { createAvatarInputMutation } from "@/server/avatar/create-avatar-input/create-avatar-input-mutation"
import { deleteAvatarInputMutation } from "@/server/avatar/delete-avatar-input/delete-avatar-input-mutation"
import { updateAvatarInputMutation } from "@/server/avatar/update-avatar-input/update-avatar-input-mutation"
import { router } from "@/server/rpc/rpc"

export const routes = router({
  createAvatarInput: createAvatarInputMutation,
  deleteAvatarInput: deleteAvatarInputMutation,
  identity: identityQuery,
  login: loginMutation,
  register: registerMutation,
  updateAvatarInput: updateAvatarInputMutation,
})
