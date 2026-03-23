import { controller } from './controller.js'

export const reasonForImporting = {
  plugin: {
    name: 'reason-for-importing',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/notifications/{id}/reason-for-importing',
          options: controller.get
        }
      ])
    }
  }
}
