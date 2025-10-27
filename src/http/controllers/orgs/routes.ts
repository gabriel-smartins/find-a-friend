import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate-org-controller.js'
import { create } from './create-org-controller.js'
import { verifyJwt } from '../../middlewares/verify-jwt.js'
import { deleteOrg } from './delete-org-controller.js'
import { getOrgProfile } from './get-org-profile-controller.js'
import { updatePassword } from './update-org-password-controller.js'
import { updateOrgProfile } from './update-org-profile-controller.js'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/sessions', authenticate)

  app.get('/orgs/me', { onRequest: [verifyJwt] }, getOrgProfile)
  app.patch('/orgs/me/profile', { onRequest: [verifyJwt] }, updateOrgProfile)
  app.patch('/orgs/me/password', { onRequest: [verifyJwt] }, updatePassword)
  app.delete('/orgs/me', { onRequest: [verifyJwt] }, deleteOrg)
}
