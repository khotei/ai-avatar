import { initTRPC } from "@trpc/server"

type ContextCallback = (
  ...args: any[]
) => object | Promise<object>

export const createRPC = <
  TNewContext extends ContextCallback | object,
>() => {
  const rpc = initTRPC.context<TNewContext>().create()

  return rpc
}
