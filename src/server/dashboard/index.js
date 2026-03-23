import { controller } from './controller.js'

export const dashboard = {
  plugin: {
    name: 'dashboard',
    register: async (server) => {
      server.route([
        { method: 'GET', path: '/dashboard', options: controller.get },
        { method: 'POST', path: '/dashboard/create', options: controller.post }
      ])
    }
  }
}
