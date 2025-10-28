import { app } from '../../../app.js'
import request from 'supertest'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      password: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'contato@amigofiel.org',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })

    expect(response.get('Set-Cookie')).toEqual(
      expect.arrayContaining([expect.stringContaining('refreshToken=')]),
    )
  })

  it('should not be able to authenticate with non-existing email', async () => {
    await request(app.server).post('/orgs').send({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'non-existing@email.org',
      password: '123456',
    })

    expect(response.statusCode).toEqual(401)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await request(app.server).post('/orgs').send({
      name: 'ONG Amigo Fiel',
      email: 'contato@amigofiel.org',
      passwordHash: '123456',
      address: 'Rua dos Girassóis, 123',
      city: 'São Paulo',
      zipCode: '01000-000',
      phone: '11987654321',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'contato@amigofiel.org',
      password: 'wrong-password',
    })

    expect(response.statusCode).toEqual(401)
  })
})
