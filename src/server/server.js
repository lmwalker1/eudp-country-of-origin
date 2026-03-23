import hapi from '@hapi/hapi'
import inert from '@hapi/inert'
import vision from '@hapi/vision'
import yar from '@hapi/yar'
import crumb from '@hapi/crumb'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync, readdirSync } from 'node:fs'

import { config } from '../config/config.js'
import { configureNunjucks } from '../config/nunjucks/nunjucks.js'
import { router } from './router.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..', '..')

export async function createServer() {
  const server = hapi.server({
    host: config.get('host'),
    port: config.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      },
      files: {
        relativeTo: path.join(projectRoot, 'public')
      }
    }
  })

  // 1. Static file serving
  await server.register(inert)

  // 2. View engine
  await server.register(vision)
  configureNunjucks(server)

  // 3. Session management
  await server.register({
    plugin: yar,
    options: {
      storeBlank: false,
      maxCookieSize: 0, // Force server-side storage
      cache: {
        expiresIn: config.get('session.ttl')
      },
      cookieOptions: {
        password: config.get('session.cookiePassword'),
        isSecure: config.get('env') === 'production',
        isHttpOnly: true,
        isSameSite: 'Lax'
      }
    }
  })

  // 4. CSRF protection
  await server.register({
    plugin: crumb,
    options: {
      cookieOptions: {
        isSecure: config.get('env') === 'production'
      }
    }
  })

  // 5. Request logging
  await server.register({
    plugin: (await import('hapi-pino')).default,
    options: {
      level: config.get('logLevel'),
      redact: ['req.headers.authorization', 'req.headers.cookie']
    }
  })

  // Static assets - webpack built assets
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: path.join(projectRoot, 'public'),
        redirectToSlash: true
      }
    },
    options: {
      auth: false
    }
  })

  // Serve govuk-frontend assets directly from node_modules (fonts, images)
  server.route({
    method: 'GET',
    path: '/govuk/assets/{param*}',
    handler: {
      directory: {
        path: path.join(projectRoot, 'node_modules', 'govuk-frontend', 'dist', 'govuk', 'assets'),
        redirectToSlash: true
      }
    },
    options: {
      auth: false
    }
  })

  // Serve govuk-frontend pre-compiled CSS and JS from node_modules
  server.route({
    method: 'GET',
    path: '/govuk/{param*}',
    handler: {
      directory: {
        path: path.join(projectRoot, 'node_modules', 'govuk-frontend', 'dist', 'govuk'),
        redirectToSlash: true
      }
    },
    options: {
      auth: false
    }
  })

  // Serve accessible-autocomplete from node_modules
  server.route({
    method: 'GET',
    path: '/vendor/accessible-autocomplete/{param*}',
    handler: {
      directory: {
        path: path.join(projectRoot, 'node_modules', 'accessible-autocomplete', 'dist'),
        redirectToSlash: true
      }
    },
    options: {
      auth: false
    }
  })

  // Debug: check paths
  server.route({
    method: 'GET',
    path: '/debug-paths',
    handler: () => {
      const govukPath = path.join(projectRoot, 'node_modules', 'govuk-frontend', 'dist', 'govuk')
      return {
        projectRoot,
        cwd: process.cwd(),
        govukPath,
        govukExists: existsSync(govukPath),
        govukCssExists: existsSync(path.join(govukPath, 'govuk-frontend.min.css')),
        publicPath: path.join(projectRoot, 'public'),
        publicExists: existsSync(path.join(projectRoot, 'public'))
      }
    },
    options: { auth: false }
  })

  // 6. Application routes
  await server.register(router)

  return server
}
