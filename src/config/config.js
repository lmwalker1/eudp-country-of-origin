import convict from 'convict'

const config = convict({
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  host: {
    format: String,
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  logLevel: {
    format: String,
    default: 'info',
    env: 'LOG_LEVEL'
  },
  session: {
    cookiePassword: {
      format: String,
      default: 'the-password-must-be-at-least-32-characters-long',
      env: 'SESSION_COOKIE_PASSWORD',
      sensitive: true
    },
    ttl: {
      format: Number,
      default: 14400000, // 4 hours
      env: 'SESSION_CACHE_TTL'
    }
  }
})

config.validate({ allowed: 'warn' })

export { config }
