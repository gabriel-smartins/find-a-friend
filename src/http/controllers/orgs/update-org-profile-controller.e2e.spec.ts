import { app } from '../../../app.js'
import request from 'supertest'
import { createAndAuthenticateOrg } from '../../../../utils/test-helper.js'

describe('Update Org Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update org profile fields', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .patch('/orgs/me/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'ONG modified',
        city: 'Rio de Janeiro',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.org).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: 'contato@amigofiel.org',
        address: 'Rua dos Girassóis, 123',

        name: 'ONG modified',
        city: 'Rio de Janeiro',
      }),
    )
  })

  it('should not be able to update org profile fields without authenticating', async () => {
    const response = await request(app.server).patch('/orgs/me/profile').send()

    expect(response.statusCode).toEqual(401)
  })
})
