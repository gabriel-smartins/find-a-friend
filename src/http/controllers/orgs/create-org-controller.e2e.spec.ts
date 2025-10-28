import { app } from '../../../app.js'
import request from 'supertest'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'ONG Adote Já',
      email: 'contato@amigofiel.org',
      password: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not be able to create a org with duplicate email', async () => {
    await request(app.server).post('/orgs').send({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      password: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const response = await request(app.server).post('/orgs').send({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      password: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    expect(response.statusCode).toEqual(409)
  })
})
