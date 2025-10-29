import { app } from '../../../app.js'
import request from 'supertest'
import { createAndAuthenticateOrg } from '../utils/test-helper.js'

describe('Update Org Password (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to change password', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .patch('/orgs/me/password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '123456',
        newPassword: '654321',
      })

    expect(response.statusCode).toEqual(204)

    const loginWithNewPasswordResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'contato@amigofiel.org',
        password: '654321',
      })

    expect(loginWithNewPasswordResponse.statusCode).toEqual(200)
  })

  it('should not be able to change org password without authenticating', async () => {
    const response = await request(app.server).patch('/orgs/me/password').send()

    expect(response.statusCode).toEqual(401)
  })
})
