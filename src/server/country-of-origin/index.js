import { controller } from './controller.js'

export const countryOfOrigin = {
  plugin: {
    name: 'country-of-origin',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/notifications/{id}/origin',
          options: controller.get
        },
        {
          method: 'POST',
          path: '/notifications/{id}/origin',
          options: controller.post
        }
      ])
    }
  }
}
