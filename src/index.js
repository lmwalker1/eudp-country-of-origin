import { createServer } from './server/server.js'

const server = await createServer()
await server.start()

server.logger.info(`Server running on ${server.info.uri}`)

process.on('unhandledRejection', (err) => {
  server.logger.error(err)
  process.exit(1)
})
