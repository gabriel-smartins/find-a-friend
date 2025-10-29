import { app } from '../../../app.js'
import request from 'supertest'
import { createAndAuthenticateOrg } from '../utils/test-helper.js'

describe('Get Org Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a org profile', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .get('/orgs/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.org).toEqual(
      expect.objectContaining({
        email: 'contato@amigofiel.org',
      }),
    )
  })

  it('should not be able to get a org without authenticating', async () => {
    const response = await request(app.server).get('/orgs/me').send()

    expect(response.statusCode).toEqual(401)
  })
})
