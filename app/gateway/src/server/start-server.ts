import type {
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http"

export const startServer = (
  server: Server<
    typeof IncomingMessage,
    typeof ServerResponse
  >,
  { port }: { port?: number } = {}
) => {
  return server.listen(port ?? 9000)
}

export const listenServer = (
  server: Server<
    typeof IncomingMessage,
    typeof ServerResponse
  >
) => {
  startServer(server)

  return new Promise((resolve) => {
    server.on("listening", resolve)
  })
}

export const closeServer = (
  server: Server<
    typeof IncomingMessage,
    typeof ServerResponse
  >
) => {
  server.close()

  return new Promise((resolve) => {
    server.on("close", resolve)
  })
}
