export const health = {
  plugin: {
    name: 'health',
    register: async (server) => {
      server.route({
        method: 'GET',
        path: '/health',
        handler: () => ({ status: 'ok' })
      })
    }
  }
}
