import { controller } from './controller.js'

export const home = {
  plugin: {
    name: 'home',
    register: async (server) => {
      server.route([
        { method: 'GET', path: '/', options: controller.get }
      ])
    }
  }
}
