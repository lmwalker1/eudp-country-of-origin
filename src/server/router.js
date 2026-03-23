import { health } from './health/index.js'
import { home } from './home/index.js'
import { dashboard } from './dashboard/index.js'
import { whatAreYouImporting } from './what-are-you-importing/index.js'
import { countryOfOrigin } from './country-of-origin/index.js'
import { reasonForImporting } from './reason-for-importing/index.js'

export const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([
        health,
        home,
        dashboard,
        whatAreYouImporting,
        countryOfOrigin,
        reasonForImporting
      ])
    }
  }
}
