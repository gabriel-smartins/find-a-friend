import { app } from '../../../app.js'
import request from 'supertest'
import { createAndAuthenticateOrg } from '../utils/test-helper.js'

describe('Delete Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a org', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .delete('/orgs/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })

  it('should not be able to delete a org without authenticating', async () => {
    const response = await request(app.server).delete('/orgs/me').send()

    expect(response.statusCode).toEqual(401)
  })
})
