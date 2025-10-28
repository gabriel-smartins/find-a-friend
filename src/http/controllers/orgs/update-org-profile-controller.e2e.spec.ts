import { app } from '../../../app.js'
import request from 'supertest'

describe('Update Org Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update org profile fields', async () => {
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
