import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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

  return { token }
}
