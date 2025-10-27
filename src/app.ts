import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env/index.js'
import fastifyCookie from '@fastify/cookie'
import { orgsRoutes } from './http/controllers/orgs/routes.js'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)
