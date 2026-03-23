import nunjucks from 'nunjucks'
import path from 'node:path'
import { readFileSync } from 'node:fs'

const rootDir = process.cwd()

/**
 * Load the Webpack assets manifest for cache-busted filenames.
 * Falls back to returning the key itself if the manifest doesn't exist (dev mode).
 */
function loadAssetsManifest() {
  try {
    const manifestPath = path.join(rootDir, 'public', 'assets-manifest.json')
    const raw = readFileSync(manifestPath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/**
 * Configure Nunjucks and register it with @hapi/vision on the Hapi server.
 */
export function configureNunjucks(server) {
  const manifest = loadAssetsManifest()

  const searchPaths = [
    path.join(rootDir, 'node_modules', 'govuk-frontend', 'dist'),
    path.join(rootDir, 'src', 'server', 'common', 'templates'),
    path.join(rootDir, 'src', 'server')
  ]

  const env = nunjucks.configure(searchPaths, {
    autoescape: true,
    trimBlocks: true,
    lstripBlocks: true,
    watch: false
  })

  // Register global function for asset path resolution
  env.addGlobal('getAssetPath', (key) => {
    if (manifest && manifest[key]) {
      return `/public/${manifest[key]}`
    }
    return `/public/${key}`
  })

  // Set the govuk-frontend asset path so template.njk resolves icons/images
  env.addGlobal('assetPath', '/public/assets')

  server.views({
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, env, options.filename)
          return (context) => template.render(context)
        }
      }
    },
    relativeTo: path.join(rootDir, 'src', 'server'),
    path: [
      path.join(rootDir, 'src', 'server', 'common', 'templates'),
      path.join(rootDir, 'src', 'server')
    ],
    isCached: process.env.NODE_ENV === 'production'
  })
}
