import { app } from '../../../app.js'
import request from 'supertest'

describe('Delete Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a org', async () => {
    await request(app.server).post('/orgs').send({
      name: 'ONG Adote Já',
      email: 'contato@delete.org',
      password: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'contato@delete.org',
      password: '123456',
    })

    const { token } = authResponse.body

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
