import { controller } from './controller.js'

export const whatAreYouImporting = {
  plugin: {
    name: 'what-are-you-importing',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/notifications/{id}/what-are-you-importing',
          options: controller.get
        },
        {
          method: 'POST',
          path: '/notifications/{id}/what-are-you-importing',
          options: controller.post
        }
      ])
    }
  }
}
