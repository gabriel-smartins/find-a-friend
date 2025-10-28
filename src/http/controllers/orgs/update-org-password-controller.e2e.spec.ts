import { app } from '../../../app.js'
import request from 'supertest'

describe('Update Org Password (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to change password', async () => {
    await request(app.server).post('/orgs').send({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      password: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'contato@amigofiel.org',
      password: '123456',
    })

    const { token } = authResponse.body

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
